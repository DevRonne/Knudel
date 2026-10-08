<#
    NpsSync - keeps the NPS configuration of a Primary/Secondary pair in sync.
    Used by Sync-NpsConfig.ps1 locally and, via Invoke-Command, on the partner node.
#>

$script:EventSource = 'NpsSync'

$script:Events = @{
    Synced              = @{ Id = 1000; Type = 'Information' }
    SecondaryChanged    = @{ Id = 2001; Type = 'Warning' }
    Failed              = @{ Id = 3000; Type = 'Error' }
    RoleUnclear         = @{ Id = 3001; Type = 'Error' }
    PartnerNotSecondary = @{ Id = 3002; Type = 'Error' }
    VerifyFailed        = @{ Id = 3003; Type = 'Error' }
    ImportBlocked       = @{ Id = 3004; Type = 'Error' }
}

$script:ServerAuthOid = '1.3.6.1.5.5.7.3.1'

$script:BackupPrefix = 'before-import-'
$script:BackupExtension = '.npsbak'

Add-Type -AssemblyName System.Security

#region Configuration and logging

function Get-NpsSyncConfig {
    param([Parameter(Mandatory)][string]$Path)

    $config = Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json

    # A misspelled key would otherwise only surface on the partner as an empty parameter.
    $missing = @('Alias', 'WorkFolder', 'RegistryPath', 'BackupsToKeep' | Where-Object {
        -not ($config.PSObject.Properties.Name -contains $_) -or [string]::IsNullOrWhiteSpace([string]$config.$_)
    })
    if (@($config.Nodes).Count -eq 0) { $missing += 'Nodes' }
    foreach ($node in @($config.Nodes)) {
        $missing += @('Name', 'Ip' | Where-Object {
            -not ($node.PSObject.Properties.Name -contains $_) -or [string]::IsNullOrWhiteSpace([string]$node.$_)
        } | ForEach-Object { "Nodes[].$_" })
    }
    if ($missing.Count -gt 0) {
        throw "nps-sync.json ($Path) is missing: $(($missing | Select-Object -Unique) -join ', ')."
    }

    # DSC only writes Name and Ip; both nodes live in the same AD domain.
    $domain = (Get-CimInstance -ClassName Win32_ComputerSystem).Domain
    foreach ($node in @($config.Nodes)) {
        if (-not ($node.PSObject.Properties.Name -contains 'Fqdn') -or [string]::IsNullOrWhiteSpace($node.Fqdn)) {
            $node | Add-Member -NotePropertyName Fqdn -NotePropertyValue "$($node.Name).$domain" -Force
        }
    }
    return $config
}

function Get-NpsNodePair {
    param([Parameter(Mandatory)]$Config)

    $self = @($Config.Nodes | Where-Object { $_.Name -eq $env:COMPUTERNAME })
    if ($self.Count -ne 1) {
        throw "Node '$env:COMPUTERNAME' must be listed exactly once in nps-sync.json."
    }
    $partner = @($Config.Nodes | Where-Object { $_.Name -ne $env:COMPUTERNAME })
    if ($partner.Count -ne 1) {
        throw 'nps-sync.json must list exactly two nodes.'
    }
    return [pscustomobject]@{ Self = $self[0]; Partner = $partner[0] }
}

function Write-NpsSyncEvent {
    param(
        [Parameter(Mandatory)][ValidateSet('Synced', 'SecondaryChanged', 'Failed', 'RoleUnclear',
            'PartnerNotSecondary', 'VerifyFailed', 'ImportBlocked')][string]$EventName,
        [Parameter(Mandatory)][string]$Message
    )
    $definition = $script:Events[$EventName]
    Write-Verbose $Message
    $entry = @{
        LogName   = 'Application'
        Source    = $script:EventSource
        EventId   = $definition.Id
        EntryType = $definition.Type
        Message   = $Message
        # Write-EventLog fails non-terminating when the source is missing; Stop lets the catch see it.
        ErrorAction = 'Stop'
    }
    # Logging must never be the reason a sync run fails (e.g. source not registered yet).
    try {
        Write-EventLog @entry
    } catch {
        Write-Warning "Could not write event $($definition.Id): $Message"
    }
}

function Stop-NpsSync {
    # Writes the event and ends the run; the caller's catch block must not log it a second time.
    param([Parameter(Mandatory)][string]$EventName, [Parameter(Mandatory)][string]$Message)

    Write-NpsSyncEvent -EventName $EventName -Message $Message
    $exception = New-Object System.InvalidOperationException($Message)
    $exception.Data['NpsSyncLogged'] = $true
    throw $exception
}

function Set-NpsSyncState {
    param([Parameter(Mandatory)][string]$RegistryPath, [Parameter(Mandatory)][hashtable]$Values)

    if (-not (Test-Path -LiteralPath $RegistryPath)) {
        New-Item -Path $RegistryPath -Force | Out-Null
    }
    foreach ($name in $Values.Keys) {
        Set-ItemProperty -LiteralPath $RegistryPath -Name $name -Value $Values[$name] -Force
    }
}

#endregion

#region Role

function Resolve-NpsRole {
    param(
        [Parameter(Mandatory)][string]$Alias,
        [Parameter(Mandatory)][string]$SelfFqdn,
        [Parameter(Mandatory)][string[]]$NodeFqdns
    )

    # DNS only: a NetBIOS/LLMNR fallback could answer for a host that is not the CNAME target.
    try {
        $records = @(Resolve-DnsName -Name $Alias -Type CNAME -DnsOnly -ErrorAction Stop |
            Where-Object { $_.Type -eq 'CNAME' })
    } catch {
        return 'Unclear'
    }
    if ($records.Count -ne 1) { return 'Unclear' }

    $target = $records[0].NameHost.TrimEnd('.')
    if ($NodeFqdns -notcontains $target) { return 'Unclear' }
    if ($target -eq $SelfFqdn) { return 'Primary' }
    return 'Secondary'
}

#endregion

#region Export and XML

function Invoke-NpsExport {
    param([Parameter(Mandatory)][string]$Path)

    if (Test-Path -LiteralPath $Path) { Remove-Item -LiteralPath $Path -Force }
    # exportPSK=YES: without it the RADIUS clients would arrive on the partner without shared secrets.
    $output = & netsh nps export filename="$Path" exportPSK=YES
    if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $Path)) {
        throw "netsh nps export failed: $($output -join ' ')"
    }
}

function ConvertTo-NormalizedXml {
    param([Parameter(Mandatory)][string]$XmlText)

    $document = New-Object System.Xml.XmlDocument
    $document.PreserveWhitespace = $false
    $document.LoadXml($XmlText)
    return $document.OuterXml
}

function Export-NpsConfigXml {
    # Returns the normalized configuration; the export file holds shared secrets and is removed at once.
    param([Parameter(Mandatory)][string]$WorkFolder)

    if (-not (Test-Path -LiteralPath $WorkFolder)) {
        New-Item -ItemType Directory -Path $WorkFolder -Force | Out-Null
    }
    $path = Join-Path $WorkFolder ("export-{0}.xml" -f [guid]::NewGuid().ToString('N'))
    try {
        Invoke-NpsExport -Path $path
        return ConvertTo-NormalizedXml -XmlText (Get-Content -LiteralPath $path -Raw)
    } finally {
        if (Test-Path -LiteralPath $path) { Remove-Item -LiteralPath $path -Force }
    }
}

function Get-XmlHash {
    param([Parameter(Mandatory)][string]$XmlText)

    $sha = [System.Security.Cryptography.SHA256]::Create()
    try {
        $bytes = $sha.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($XmlText))
        return [System.BitConverter]::ToString($bytes).Replace('-', '')
    } finally {
        $sha.Dispose()
    }
}

function Get-EapFieldCount {
    param([Parameter(Mandatory)][string]$XmlText)

    $document = New-Object System.Xml.XmlDocument
    $document.LoadXml($XmlText)
    return @($document.SelectNodes('//*[not(*)]') |
        Where-Object { $_.get_Name() -match 'eap' -and $_.InnerText.Trim() }).Count
}

#endregion

#region Mirroring

function New-MirrorPair {
    param(
        [Parameter(Mandatory)][ValidateSet('IP', 'Name', 'Certificate')][string]$Kind,
        [Parameter(Mandatory)][string]$Self,
        [Parameter(Mandatory)][string]$Partner
    )
    return [pscustomobject]@{ Kind = $Kind; Self = $Self; Partner = $Partner }
}

function Get-MirrorPattern {
    param([Parameter(Mandatory)][string]$Kind, [Parameter(Mandatory)][string]$Value)

    switch ($Kind) {
        'IP' {
            # Plain and regex notation (policy conditions); 27.24.0.3 must not match 27.24.0.33.
            $escapedForm = [regex]::Escape($Value.Replace('.', '\.')) + '(?!\d)'
            $plainForm = '(?<![\d.\\])' + [regex]::Escape($Value) + '(?!\d)'
            return @($escapedForm, $plainForm)
        }
        # The hash sits inside a hex blob (EAP settings), so no boundaries; 40 hex chars do not collide.
        'Certificate' { return @([regex]::Escape($Value)) }
        # A trailing dot is allowed on purpose: that covers the FQDN.
        default { return @('(?<![A-Za-z0-9_-])' + [regex]::Escape($Value) + '(?![A-Za-z0-9_-])') }
    }
}

function ConvertTo-MirroredXml {
    <#
    .SYNOPSIS
        Swaps every node identity (IP, host name, certificate hash) in both directions in a single pass.
    .DESCRIPTION
        Each node forwards to the other one, so the Secondary's configuration is the Primary's with the
        identities swapped. A single regex pass avoids swapping a value back. Text nodes and attributes
        are handled, including values embedded in longer strings.
    #>
    param([Parameter(Mandatory)][string]$XmlText, [Parameter(Mandatory)][object[]]$Pairs)

    $replacements = @{}
    $patterns = New-Object System.Collections.Generic.List[string]
    foreach ($pair in $Pairs) {
        foreach ($direction in @(@($pair.Self, $pair.Partner), @($pair.Partner, $pair.Self))) {
            $from = [string]$direction[0]
            $to = [string]$direction[1]
            $replacements[$from] = $to
            if ($pair.Kind -eq 'IP') {
                $replacements[$from.Replace('.', '\.')] = $to.Replace('.', '\.')
            }
            foreach ($pattern in (Get-MirrorPattern -Kind $pair.Kind -Value $from)) {
                $patterns.Add($pattern)
            }
        }
    }

    $regex = New-Object System.Text.RegularExpressions.Regex(($patterns -join '|'), 'IgnoreCase')
    $evaluator = [System.Text.RegularExpressions.MatchEvaluator]{
        param($match)
        $replacement = $replacements[$match.Value]
        # keep the casing style of the original (NETBIOS upper case, FQDN lower case)
        if ($match.Value -cmatch '[a-z]' -and $match.Value -cnotmatch '[A-Z]') { return $replacement.ToLower() }
        if ($match.Value -cmatch '[A-Z]' -and $match.Value -cnotmatch '[a-z]') { return $replacement.ToUpper() }
        return $replacement
    }

    $document = New-Object System.Xml.XmlDocument
    $document.PreserveWhitespace = $false
    $document.LoadXml($XmlText)

    $changes = New-Object System.Collections.Generic.List[string]
    foreach ($node in @($document.SelectNodes('//text() | //@*'))) {
        $oldValue = $node.Value
        if (-not $regex.IsMatch($oldValue)) { continue }

        $newValue = $regex.Replace($oldValue, $evaluator)
        if ($newValue -eq $oldValue) { continue }
        $node.Value = $newValue
        $changes.Add(('{0}: {1} -> {2}' -f (Get-XmlNodeLocation -Node $node),
            (Get-ShortText $oldValue), (Get-ShortText $newValue)))
    }
    return [pscustomobject]@{ Xml = $document.OuterXml; Changes = $changes.ToArray() }
}

function Get-XmlNodeLocation {
    param([Parameter(Mandatory)]$Node)

    # get_Name(): for NPS elements with a name="..." attribute, .Name returns that attribute instead.
    if ($Node.NodeType -eq 'Attribute') {
        return $Node.OwnerElement.get_Name() + '/@' + $Node.get_Name()
    }
    return $Node.ParentNode.get_Name()
}

function Get-ShortText {
    param([string]$Text, [int]$MaxLength = 90)

    $value = $Text.Trim()
    if ($value.Length -le $MaxLength) { return $value }
    return $value.Substring(0, $MaxLength) + '...'
}

#endregion

#region Certificates

function Get-ReferencedCertificate {
    # Local machine certificates whose thumbprint appears in the configuration (PEAP/EAP policies).
    param([Parameter(Mandatory)][string]$XmlText)

    return @(Get-ChildItem -Path Cert:\LocalMachine\My |
        Where-Object { $XmlText.IndexOf($_.Thumbprint, [System.StringComparison]::OrdinalIgnoreCase) -ge 0 } |
        ForEach-Object { $_.Thumbprint })
}

function Get-ServerAuthCertificate {
    param([Parameter(Mandatory)][string]$Fqdn)

    $now = Get-Date
    $certificate = Get-ChildItem -Path Cert:\LocalMachine\My |
        Where-Object {
            $_.HasPrivateKey -and $_.NotAfter -gt $now -and
            @($_.EnhancedKeyUsageList | Where-Object { $_.ObjectId -eq $script:ServerAuthOid }).Count -gt 0 -and
            @($_.DnsNameList | Where-Object { $_.Unicode -eq $Fqdn }).Count -gt 0
        } |
        Sort-Object NotAfter -Descending |
        Select-Object -First 1

    if ($certificate) { return $certificate.Thumbprint }
    return ''
}

function Get-MirrorPlan {
    # Builds the swap list; BlockReason is set when the certificate mapping is not unambiguous.
    param(
        [Parameter(Mandatory)]$Self,
        [Parameter(Mandatory)]$Partner,
        [Parameter(Mandatory)][string]$OwnXml,
        [string]$PartnerCertificate
    )

    $pairs = @(
        New-MirrorPair -Kind IP -Self $Self.Ip -Partner $Partner.Ip
        New-MirrorPair -Kind Name -Self $Self.Name -Partner $Partner.Name
    )
    $blockReason = ''
    $ownCertificates = @(Get-ReferencedCertificate -XmlText $OwnXml)

    if ($ownCertificates.Count -gt 1) {
        $blockReason = "Configuration references $($ownCertificates.Count) local certificates " +
            "($($ownCertificates -join ', ')); mapping to the partner is ambiguous."
    } elseif ($ownCertificates.Count -eq 1) {
        if ([string]::IsNullOrWhiteSpace($PartnerCertificate)) {
            $blockReason = "Configuration references certificate $($ownCertificates[0]), but $($Partner.Name) " +
                "has no valid server authentication certificate for $($Partner.Fqdn)."
        } else {
            $pairs += New-MirrorPair -Kind Certificate -Self $ownCertificates[0] -Partner $PartnerCertificate
        }
    }

    return [pscustomobject]@{
        Pairs           = $pairs
        OwnCertificates = $ownCertificates
        BlockReason     = $blockReason
    }
}

#endregion

#region Backups

function Protect-NpsSyncFolder {
    # Exports and backups contain the RADIUS shared secrets: Administrators and SYSTEM only.
    param([Parameter(Mandatory)][string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
    $acl = New-Object System.Security.AccessControl.DirectorySecurity
    $acl.SetAccessRuleProtection($true, $false)
    # SIDs rather than names: group names differ between OS languages.
    foreach ($sid in @('S-1-5-32-544', 'S-1-5-18')) {
        $identity = (New-Object System.Security.Principal.SecurityIdentifier($sid)).Translate(
            [System.Security.Principal.NTAccount])
        $rule = New-Object System.Security.AccessControl.FileSystemAccessRule(
            $identity, 'FullControl', 'ContainerInherit,ObjectInherit', 'None', 'Allow')
        $acl.AddAccessRule($rule)
    }
    Set-Acl -LiteralPath $Path -AclObject $acl
}

function Protect-NpsSyncBackupFile {
    # Machine-bound DPAPI: readable on this node only, so a copied backup does not leak the secrets.
    param([Parameter(Mandatory)][string]$PlainPath, [Parameter(Mandatory)][string]$EncryptedPath)

    $bytes = [System.IO.File]::ReadAllBytes($PlainPath)
    $protected = [System.Security.Cryptography.ProtectedData]::Protect($bytes, $null,
        [System.Security.Cryptography.DataProtectionScope]::LocalMachine)
    [System.IO.File]::WriteAllBytes($EncryptedPath, $protected)
    Remove-Item -LiteralPath $PlainPath -Force
}

function Save-NpsSyncBackup {
    param([Parameter(Mandatory)][string]$Folder, [Parameter(Mandatory)][string]$Stamp)

    # Plain backups from versions before encryption are encrypted on the way.
    foreach ($plain in @(Get-ChildItem -LiteralPath $Folder -Filter "$script:BackupPrefix*.xml")) {
        $target = [System.IO.Path]::ChangeExtension($plain.FullName, $script:BackupExtension)
        Protect-NpsSyncBackupFile -PlainPath $plain.FullName -EncryptedPath $target
    }

    $name = $script:BackupPrefix + $Stamp + $script:BackupExtension
    $plainPath = Join-Path $Folder ($script:BackupPrefix + $Stamp + '.xml')
    try {
        Invoke-NpsExport -Path $plainPath
        Protect-NpsSyncBackupFile -PlainPath $plainPath -EncryptedPath (Join-Path $Folder $name)
    } finally {
        if (Test-Path -LiteralPath $plainPath) { Remove-Item -LiteralPath $plainPath -Force }
    }
    return $name
}

function Restore-NpsSyncBackup {
    <#
    .SYNOPSIS
        Imports a backup made before a sync. Run on the node that holds the backup.
    .EXAMPLE
        Import-Module .\NpsSync.psm1; Restore-NpsSyncBackup -Path .\Work\Backup\before-import-20261007-101500.npsbak
    #>
    param([Parameter(Mandatory)][string]$Path)

    $backupPath = (Resolve-Path -LiteralPath $Path).ProviderPath
    $plainPath = Join-Path (Split-Path -Parent $backupPath) 'restore.xml'
    try {
        $bytes = [System.Security.Cryptography.ProtectedData]::Unprotect(
            [System.IO.File]::ReadAllBytes($backupPath), $null,
            [System.Security.Cryptography.DataProtectionScope]::LocalMachine)
        [System.IO.File]::WriteAllBytes($plainPath, $bytes)
        Import-NpsConfiguration -Path $plainPath
    } finally {
        if (Test-Path -LiteralPath $plainPath) { Remove-Item -LiteralPath $plainPath -Force }
    }
}

#endregion

#region Partner side (called through Invoke-Command)

function Get-NpsPartnerSnapshot {
    param(
        [Parameter(Mandatory)][string]$Alias,
        [Parameter(Mandatory)][string]$SelfFqdn,
        [Parameter(Mandatory)][string[]]$NodeFqdns,
        [Parameter(Mandatory)][string]$WorkFolder
    )

    return [pscustomobject]@{
        Role        = Resolve-NpsRole -Alias $Alias -SelfFqdn $SelfFqdn -NodeFqdns $NodeFqdns
        Xml         = Export-NpsConfigXml -WorkFolder $WorkFolder
        Certificate = Get-ServerAuthCertificate -Fqdn $SelfFqdn
    }
}

function Import-NpsConfigXml {
    <#
    .SYNOPSIS
        Backs up the current configuration, imports the given one and returns the hash of the result.
    .NOTES
        Import-NpsConfiguration replaces the complete configuration, it does not merge.
    #>
    param(
        [Parameter(Mandatory)][string]$XmlText,
        [Parameter(Mandatory)][string]$WorkFolder,
        [Parameter(Mandatory)][string]$RegistryPath,
        [int]$BackupsToKeep = 30
    )

    $backupFolder = Join-Path $WorkFolder 'Backup'
    Protect-NpsSyncFolder -Path $backupFolder
    $stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    $backupName = Save-NpsSyncBackup -Folder $backupFolder -Stamp $stamp
    Get-ChildItem -LiteralPath $backupFolder -Filter "$script:BackupPrefix*" |
        Sort-Object Name -Descending |
        Select-Object -Skip $BackupsToKeep |
        Remove-Item -Force

    $importPath = Join-Path $WorkFolder 'import.xml'
    try {
        $document = New-Object System.Xml.XmlDocument
        $document.LoadXml($XmlText)
        # Save() keeps the encoding declared in the XML header, which Import-NpsConfiguration relies on.
        $document.Save($importPath)
        Import-NpsConfiguration -Path $importPath
    } finally {
        if (Test-Path -LiteralPath $importPath) { Remove-Item -LiteralPath $importPath -Force }
    }

    $resultHash = Get-XmlHash -XmlText (Export-NpsConfigXml -WorkFolder $WorkFolder)
    Set-NpsSyncState -RegistryPath $RegistryPath -Values @{
        ImportHash = $resultHash
        LastImport = (Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '|' + $stamp
    }
    return [pscustomobject]@{ Hash = $resultHash; Backup = $backupName }
}

#endregion

#region Run modes

function Invoke-NpsSecondaryCheck {
    param([Parameter(Mandatory)]$Config, [Parameter(Mandatory)]$Nodes)

    $currentHash = Get-XmlHash -XmlText (Export-NpsConfigXml -WorkFolder $Config.WorkFolder)
    $state = Get-ItemProperty -LiteralPath $Config.RegistryPath -Name 'ImportHash' -ErrorAction SilentlyContinue
    $importHash = if ($state) { $state.ImportHash } else { $null }

    if ($importHash -and $importHash -ne $currentHash) {
        Write-NpsSyncEvent -EventName SecondaryChanged -Message ("$($Nodes.Self.Name) is the Secondary and its " +
            "configuration was changed locally. Make changes on $($Nodes.Partner.Name); local changes are " +
            "overwritten on the next sync (backup in $($Config.WorkFolder)\Backup).")
    }
}

function Invoke-NpsPrimarySync {
    param(
        [Parameter(Mandatory)]$Config,
        [Parameter(Mandatory)]$Nodes,
        [string]$ModulePath = $PSCommandPath,
        [switch]$CompareOnly
    )

    $partner = $Nodes.Partner
    $nodeFqdns = @($Config.Nodes | ForEach-Object { $_.Fqdn })
    $ownXml = Export-NpsConfigXml -WorkFolder $Config.WorkFolder

    $snapshot = Invoke-Command -ComputerName $partner.Fqdn -ArgumentList $ModulePath, $Config.Alias,
        $partner.Fqdn, $nodeFqdns, $Config.WorkFolder -ScriptBlock {
        param($ModulePath, $Alias, $SelfFqdn, $NodeFqdns, $WorkFolder)
        Import-Module $ModulePath -Force
        Get-NpsPartnerSnapshot -Alias $Alias -SelfFqdn $SelfFqdn -NodeFqdns $NodeFqdns -WorkFolder $WorkFolder
    }

    # Both sides must agree on the roles; they can disagree for a while after the CNAME was switched.
    if ($snapshot.Role -ne 'Secondary' -and -not $CompareOnly) {
        Stop-NpsSync -EventName PartnerNotSecondary -Message ("$($partner.Name) sees itself as " +
            "'$($snapshot.Role)', not as Secondary. No sync.")
    }

    $plan = Get-MirrorPlan -Self $Nodes.Self -Partner $partner -OwnXml $ownXml -PartnerCertificate $snapshot.Certificate
    $partnerMirrored = (ConvertTo-MirroredXml -XmlText $snapshot.Xml -Pairs $plan.Pairs).Xml
    $forPartner = ConvertTo-MirroredXml -XmlText $ownXml -Pairs $plan.Pairs
    $inSync = $partnerMirrored -eq $ownXml

    if ($CompareOnly) {
        $newLine = [Environment]::NewLine
        $ownLines = $ownXml.Replace('><', '>' + $newLine + '<') -split $newLine
        $partnerLines = $partnerMirrored.Replace('><', '>' + $newLine + '<') -split $newLine
        $difference = @(Compare-Object -ReferenceObject $ownLines -DifferenceObject $partnerLines)
        return [pscustomobject]@{
            PartnerRole        = $snapshot.Role
            InSync             = $inSync
            MirrorPairs        = @($plan.Pairs | ForEach-Object { "$($_.Kind) $($_.Self) <-> $($_.Partner)" })
            EapFields          = Get-EapFieldCount -XmlText $ownXml
            OwnCertificates    = $plan.OwnCertificates
            PartnerCertificate = $snapshot.Certificate
            BlockReason        = $plan.BlockReason
            ChangesForPartner  = $forPartner.Changes
            DifferingLines     = $difference
        }
    }

    $ownHash = Get-XmlHash -XmlText $ownXml
    $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    if ($inSync) {
        Set-NpsSyncState -RegistryPath $Config.RegistryPath -Values @{ LastSync = "$timestamp|in-sync|$ownHash" }
        return
    }
    if ($plan.BlockReason) {
        Stop-NpsSync -EventName ImportBlocked -Message "No import: $($plan.BlockReason)"
    }

    $expectedHash = Get-XmlHash -XmlText (ConvertTo-NormalizedXml -XmlText $forPartner.Xml)
    $result = Invoke-Command -ComputerName $partner.Fqdn -ArgumentList $ModulePath, $forPartner.Xml,
        $Config.WorkFolder, $Config.RegistryPath, ([int]$Config.BackupsToKeep) -ScriptBlock {
        param($ModulePath, $XmlText, $WorkFolder, $RegistryPath, $BackupsToKeep)
        Import-Module $ModulePath -Force
        $import = @{
            XmlText       = $XmlText
            WorkFolder    = $WorkFolder
            RegistryPath  = $RegistryPath
            BackupsToKeep = $BackupsToKeep
        }
        Import-NpsConfigXml @import
    }

    if ($result.Hash -ne $expectedHash) {
        Stop-NpsSync -EventName VerifyFailed -Message ("Import on $($partner.Name) finished, but the resulting " +
            "configuration differs from what was sent. Backup: $($result.Backup). Check with -Mode Compare.")
    }
    Set-NpsSyncState -RegistryPath $Config.RegistryPath -Values @{ LastSync = "$timestamp|imported|$ownHash" }
    Write-NpsSyncEvent -EventName Synced -Message ("Configuration synced from $($Nodes.Self.Name) to " +
        "$($partner.Name). Previous state saved there as $($result.Backup).")
}

function Show-NpsSecondaryNotice {
    param([Parameter(Mandatory)]$Nodes, [Parameter(Mandatory)][string]$Alias)

    $newLine = [Environment]::NewLine
    $text = "This NPS server ($($Nodes.Self.Name)) is the SECONDARY." + $newLine + $newLine +
        'Do not change the NPS configuration here; it is overwritten by the Primary on the next sync.' +
        $newLine + $newLine + "Primary: $($Nodes.Partner.Name) (DNS alias $Alias)"
    $warningIcon = 48
    $null = (New-Object -ComObject WScript.Shell).Popup($text, 0, 'NPS Secondary', $warningIcon)
}

#endregion

Export-ModuleMember -Function Get-NpsSyncConfig, Get-NpsNodePair, Resolve-NpsRole, Write-NpsSyncEvent,
    Stop-NpsSync, Set-NpsSyncState, Export-NpsConfigXml, ConvertTo-NormalizedXml, Get-XmlHash,
    Get-EapFieldCount, New-MirrorPair, ConvertTo-MirroredXml, Get-MirrorPlan, Get-NpsPartnerSnapshot,
    Import-NpsConfigXml, Invoke-NpsSecondaryCheck, Invoke-NpsPrimarySync, Show-NpsSecondaryNotice,
    Protect-NpsSyncFolder, Save-NpsSyncBackup, Restore-NpsSyncBackup
