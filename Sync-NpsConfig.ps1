<#
.SYNOPSIS
    Synchronizes the NPS configuration from the Primary to the Secondary node.

.DESCRIPTION
    Runs on both NPS nodes as a scheduled task. The node the DNS alias (CNAME) points to is the Primary.
    The Primary exports its configuration, mirrors it for the partner and imports it there when it differs.
    The Secondary only reports local changes, which are overwritten on the next sync.

.PARAMETER Mode
    Run      Scheduled sync.
    Compare  Shows the differences and the values that would be changed for the partner. Changes nothing.
    Notice   Logon popup on the Secondary.

.EXAMPLE
    .\Sync-NpsConfig.ps1 -Mode Compare
#>
[CmdletBinding()]
param(
    [ValidateSet('Run', 'Compare', 'Notice')]
    [string]$Mode = 'Run'
)

$ErrorActionPreference = 'Stop'
Import-Module (Join-Path $PSScriptRoot 'NpsSync.psm1') -Force

$config = Get-NpsSyncConfig -Path (Join-Path $PSScriptRoot 'nps-sync.json')
$nodes = Get-NpsNodePair -Config $config
$nodeFqdns = @($config.Nodes | ForEach-Object { $_.Fqdn })
$role = Resolve-NpsRole -Alias $config.Alias -SelfFqdn $nodes.Self.Fqdn -NodeFqdns $nodeFqdns

if ($Mode -eq 'Notice') {
    if ($role -eq 'Secondary') { Show-NpsSecondaryNotice -Nodes $nodes -Alias $config.Alias }
    return
}

$lock = New-Object System.Threading.Mutex($false, 'Global\NpsSync')
if (-not $lock.WaitOne(0)) {
    Write-Verbose 'Another sync run is active.'
    return
}

try {
    if ($role -eq 'Unclear') {
        Stop-NpsSync -EventName RoleUnclear -Message ("'$($config.Alias)' is not a single CNAME pointing to one " +
            'of the NPS nodes. No sync.')
    }

    if ($role -eq 'Secondary') {
        if ($Mode -eq 'Compare') { Write-Output 'This node is the Secondary. Run -Mode Compare on the Primary.' }
        else { Invoke-NpsSecondaryCheck -Config $config -Nodes $nodes }
        return
    }

    if ($Mode -eq 'Run') {
        Invoke-NpsPrimarySync -Config $config -Nodes $nodes
        return
    }

    $report = Invoke-NpsPrimarySync -Config $config -Nodes $nodes -CompareOnly
    $summary = 'PartnerRole', 'InSync', 'MirrorPairs', 'EapFields', 'OwnCertificates', 'PartnerCertificate', 'BlockReason'
    $report | Select-Object -Property $summary | Format-List
    Write-Output ("Values changed for the partner ($(@($report.ChangesForPartner).Count)):")
    $report.ChangesForPartner | Select-Object -First 30 | ForEach-Object { Write-Output "  $_" }
    Write-Output ("Differing lines after mirroring ($(@($report.DifferingLines).Count)):")
    $report.DifferingLines | Select-Object -First 40 | Format-Table -AutoSize | Out-String -Width 300
}
catch {
    if (-not $_.Exception.Data['NpsSyncLogged']) {
        Write-NpsSyncEvent -EventName Failed -Message ("$($_.Exception.Message) | $($_.InvocationInfo.PositionMessage)")
    }
    exit 1
}
finally {
    $lock.ReleaseMutex()
    $lock.Dispose()
}
