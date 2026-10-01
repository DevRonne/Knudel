# Pester 3.4 syntax (the version shipped with Windows Server).
# Run: Invoke-Pester -Path .\Tests

$modulePath = Join-Path (Split-Path -Parent $PSScriptRoot) 'NpsSync.psm1'
Import-Module $modulePath -Force

$thumbprintA = 'AAAA1111BBBB2222CCCC3333DDDD4444EEEE5555'
$thumbprintB = '9999FFFF8888EEEE7777DDDD6666CCCC5555BBBB'

$pairs = @(
    New-MirrorPair -Kind IP -Self '27.24.0.33' -Partner '27.24.0.34'
    New-MirrorPair -Kind Name -Self 'NPSNODE001' -Partner 'NPSNODE201'
    New-MirrorPair -Kind Certificate -Self $thumbprintA -Partner $thumbprintB
)

$primaryXml = ConvertTo-NormalizedXml -XmlText @"
<Root>
  <Clients>
    <Item name="NPSNODE201"><IP_Address>27.24.0.34</IP_Address></Item>
    <Item name="DC"><IP_Address>27.24.0.3</IP_Address></Item>
    <Item name="Switch330"><IP_Address>27.24.0.330</IP_Address></Item>
  </Clients>
  <Groups><RadiusGroup><Address>27.24.0.34</Address><Host>npsnode201.corp.example</Host></RadiusGroup></Groups>
  <Policies>
    <Condition>Client-IPv4-Address=^27\.24\.0\.34$</Condition>
    <Nas>NPSNODE0010</Nas>
    <Account>CORP\NPSNODE001$</Account>
    <msEAPConfiguration>0d000000${thumbprintA}01</msEAPConfiguration>
    <Other>AAAA1111BBBB2222CCCC3333DDDD4444EEEE5556</Other>
  </Policies>
</Root>
"@

Describe 'ConvertTo-MirroredXml' {
    $mirrored = (ConvertTo-MirroredXml -XmlText $primaryXml -Pairs $pairs).Xml

    It 'points the remote server group to the other node' {
        $mirrored | Should Match '<Address>27\.24\.0\.33</Address>'
    }
    It 'swaps name and address of the partner client' {
        $mirrored | Should Match 'name="NPSNODE001"><IP_Address>27\.24\.0\.33<'
    }
    It 'does not touch addresses that only share a prefix' {
        $mirrored | Should Match '>27\.24\.0\.3<'
        $mirrored | Should Match '>27\.24\.0\.330<'
    }
    It 'does not touch names that only share a prefix' {
        $mirrored | Should Match '<Nas>NPSNODE0010<'
    }
    It 'swaps the FQDN and keeps lower case' {
        $mirrored | Should Match '<Host>npsnode001\.corp\.example<'
    }
    It 'swaps addresses in regex notation' {
        $mirrored | Should Match '\^27\\\.24\\\.0\\\.33\$'
    }
    It 'swaps the computer account' {
        $mirrored | Should Match 'CORP\\NPSNODE201\$<'
    }
    It 'swaps the certificate thumbprint inside a hex blob' {
        $mirrored | Should Match ('0d000000' + $thumbprintB + '01')
    }
    It 'leaves hex values without the thumbprint alone' {
        $mirrored | Should Match '<Other>AAAA1111BBBB2222CCCC3333DDDD4444EEEE5556<'
    }
    It 'returns the original when mirrored twice' {
        (ConvertTo-MirroredXml -XmlText $mirrored -Pairs $pairs).Xml | Should BeExactly $primaryXml
    }
    It 'lists every changed value' {
        @((ConvertTo-MirroredXml -XmlText $primaryXml -Pairs $pairs).Changes).Count | Should Be 7
    }
}

Describe 'ConvertTo-NormalizedXml and Get-XmlHash' {
    It 'ignores formatting whitespace' {
        $compact = '<Root><A>1</A></Root>'
        $newLine = [Environment]::NewLine
        $indented = '<Root>' + $newLine + '  <A>1</A>' + $newLine + '</Root>'
        Get-XmlHash (ConvertTo-NormalizedXml $indented) | Should Be (Get-XmlHash (ConvertTo-NormalizedXml $compact))
    }
    It 'detects a changed value' {
        Get-XmlHash '<Root><A>1</A></Root>' | Should Not Be (Get-XmlHash '<Root><A>2</A></Root>')
    }
}

Describe 'Get-EapFieldCount' {
    It 'counts filled EAP fields' {
        Get-EapFieldCount -XmlText $primaryXml | Should Be 1
    }
}

$config = [pscustomobject]@{
    Alias         = 'radius.corp.example'
    WorkFolder    = 'TestDrive:\Sync'
    RegistryPath  = 'HKCU:\Software\NpsSyncTests'
    BackupsToKeep = 30
    Nodes         = @(
        [pscustomobject]@{ Name = 'NPSNODE001'; Ip = '27.24.0.33'; Fqdn = 'npsnode001.corp.example' }
        [pscustomobject]@{ Name = 'NPSNODE201'; Ip = '27.24.0.34'; Fqdn = 'npsnode201.corp.example' }
    )
}
$nodes = [pscustomobject]@{ Self = $config.Nodes[0]; Partner = $config.Nodes[1] }
$ownXml = ConvertTo-NormalizedXml -XmlText (
    '<Root><Group><Address>27.24.0.34</Address></Group><Client name="SW1"><IP>10.0.0.5</IP></Client></Root>')
$partnerInSync = ConvertTo-NormalizedXml -XmlText (
    '<Root><Group><Address>27.24.0.33</Address></Group><Client name="SW1"><IP>10.0.0.5</IP></Client></Root>')
$partnerOutdated = ConvertTo-NormalizedXml -XmlText '<Root><Group><Address>27.24.0.33</Address></Group></Root>'

function Set-PrimaryMocks {
    param([string]$PartnerXml, [string]$PartnerRole = 'Secondary', [string]$ImportHash = '')

    $localXml = $ownXml
    Mock -ModuleName NpsSync Export-NpsConfigXml { $localXml }.GetNewClosure()
    Mock -ModuleName NpsSync Get-ReferencedCertificate { @() }
    Mock -ModuleName NpsSync Set-NpsSyncState { }
    Mock -ModuleName NpsSync Write-NpsSyncEvent { }
    Mock -ModuleName NpsSync Invoke-Command -ParameterFilter { $ArgumentList.Count -eq 5 -and $ArgumentList[1] -like 'radius*' } {
        [pscustomobject]@{ Role = $PartnerRole; Xml = $PartnerXml; Certificate = '' }
    }.GetNewClosure()
    # A closure would hide the bound parameters from the mock body in Pester 3.4, hence the global.
    $global:NpsSyncTestImportHash = $ImportHash
    Mock -ModuleName NpsSync Invoke-Command -ParameterFilter { $ArgumentList[1] -like '<*' } {
        $hash = $global:NpsSyncTestImportHash
        if (-not $hash) { $hash = Get-XmlHash -XmlText $ArgumentList[1] }
        [pscustomobject]@{ Hash = $hash; Backup = 'before-import-test.xml' }
    }
}

Describe 'Invoke-NpsPrimarySync' {
    Context 'nodes already in sync' {
        Set-PrimaryMocks -PartnerXml $partnerInSync
        Invoke-NpsPrimarySync -Config $config -Nodes $nodes

        It 'does not import' {
            Assert-MockCalled -ModuleName NpsSync Invoke-Command -Times 0 -ParameterFilter { $ArgumentList[1] -like '<*' }
        }
        It 'records the check' {
            Assert-MockCalled -ModuleName NpsSync Set-NpsSyncState -Times 1 -ParameterFilter { $Values.LastSync -like '*|in-sync|*' }
        }
    }

    Context 'partner configuration differs' {
        Set-PrimaryMocks -PartnerXml $partnerOutdated
        Invoke-NpsPrimarySync -Config $config -Nodes $nodes

        It 'imports the mirrored configuration on the partner' {
            Assert-MockCalled -ModuleName NpsSync Invoke-Command -Times 1 -ParameterFilter {
                $ArgumentList[1] -like '*<Address>27.24.0.33</Address>*' }
        }
        It 'writes the success event' {
            Assert-MockCalled -ModuleName NpsSync Write-NpsSyncEvent -Times 1 -ParameterFilter { $EventName -eq 'Synced' }
        }
    }

    Context 'partner does not see itself as Secondary' {
        Set-PrimaryMocks -PartnerXml $partnerOutdated -PartnerRole 'Primary'

        It 'stops without importing' {
            { Invoke-NpsPrimarySync -Config $config -Nodes $nodes } | Should Throw
            Assert-MockCalled -ModuleName NpsSync Write-NpsSyncEvent -Times 1 -ParameterFilter { $EventName -eq 'PartnerNotSecondary' }
            Assert-MockCalled -ModuleName NpsSync Invoke-Command -Times 0 -ParameterFilter { $ArgumentList[1] -like '<*' }
        }
    }

    Context 'imported result differs from what was sent' {
        Set-PrimaryMocks -PartnerXml $partnerOutdated -ImportHash 'DIFFERENT'

        It 'reports the failed verification' {
            { Invoke-NpsPrimarySync -Config $config -Nodes $nodes } | Should Throw
            Assert-MockCalled -ModuleName NpsSync Write-NpsSyncEvent -Times 1 -ParameterFilter { $EventName -eq 'VerifyFailed' }
        }
    }

    Context 'certificate mapping is ambiguous' {
        Set-PrimaryMocks -PartnerXml $partnerOutdated
        Mock -ModuleName NpsSync Get-ReferencedCertificate { @('AAAA', 'BBBB') }

        It 'blocks the import' {
            { Invoke-NpsPrimarySync -Config $config -Nodes $nodes } | Should Throw
            Assert-MockCalled -ModuleName NpsSync Write-NpsSyncEvent -Times 1 -ParameterFilter { $EventName -eq 'ImportBlocked' }
            Assert-MockCalled -ModuleName NpsSync Invoke-Command -Times 0 -ParameterFilter { $ArgumentList[1] -like '<*' }
        }
    }

    Context 'compare mode' {
        Set-PrimaryMocks -PartnerXml $partnerOutdated
        $report = Invoke-NpsPrimarySync -Config $config -Nodes $nodes -CompareOnly

        It 'reports the difference' {
            $report.InSync | Should Be $false
            @($report.DifferingLines).Count | Should BeGreaterThan 0
        }
        It 'changes nothing' {
            Assert-MockCalled -ModuleName NpsSync Invoke-Command -Times 0 -ParameterFilter { $ArgumentList[1] -like '<*' }
            Assert-MockCalled -ModuleName NpsSync Set-NpsSyncState -Times 0
        }
    }
}

Describe 'Invoke-NpsSecondaryCheck' {
    Context 'local change on the Secondary' {
        Mock -ModuleName NpsSync Export-NpsConfigXml { '<Root><Changed/></Root>' }
        Mock -ModuleName NpsSync Get-ItemProperty { [pscustomobject]@{ ImportHash = 'HASH-OF-LAST-IMPORT' } }
        Mock -ModuleName NpsSync Write-NpsSyncEvent { }
        Invoke-NpsSecondaryCheck -Config $config -Nodes $nodes

        It 'writes the warning' {
            Assert-MockCalled -ModuleName NpsSync Write-NpsSyncEvent -Times 1 -ParameterFilter { $EventName -eq 'SecondaryChanged' }
        }
    }

    Context 'no local change' {
        $current = '<Root><Same/></Root>'
        Mock -ModuleName NpsSync Export-NpsConfigXml { $current }.GetNewClosure()
        Mock -ModuleName NpsSync Get-ItemProperty { [pscustomobject]@{ ImportHash = (Get-XmlHash -XmlText $current) } }.GetNewClosure()
        Mock -ModuleName NpsSync Write-NpsSyncEvent { }
        Invoke-NpsSecondaryCheck -Config $config -Nodes $nodes

        It 'stays quiet' {
            Assert-MockCalled -ModuleName NpsSync Write-NpsSyncEvent -Times 0
        }
    }
}
