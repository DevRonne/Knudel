<#
.SYNOPSIS
    Sets up the NPS sync on this node. Run it on both nodes as administrator.

.DESCRIPTION
    Registers the event source, restricts the work folder to Administrators and SYSTEM (exports contain
    the RADIUS shared secrets) and creates the scheduled tasks \GMN\NPS-Sync and \GMN\NPS-Sync-Notice.
    Safe to run again; existing tasks are replaced.

.PARAMETER Account
    Account for the sync task. Empty runs it as SYSTEM; the partner's computer account then needs local
    administrator rights on this node. Otherwise a gMSA such as 'DOMAIN\gmsaNpsSync$'.

.PARAMETER Minutes
    Sync interval.
#>
[CmdletBinding()]
param(
    [string]$Account = '',
    [int]$Minutes = 5
)

$ErrorActionPreference = 'Stop'
Import-Module (Join-Path $PSScriptRoot 'NpsSync.psm1') -Force

$builtinAdministrators = 'S-1-5-32-544'
$taskPath = '\GMN\'

function Register-SyncEventSource {
    if (-not [System.Diagnostics.EventLog]::SourceExists('NpsSync')) {
        New-EventLog -LogName Application -Source 'NpsSync'
    }
}

function Register-SyncTask {
    param([Parameter(Mandatory)][string]$ScriptPath)

    # Note: -ExecutionPolicy Bypass does not override an AllSigned policy set by GPO.
    $argument = '-NoProfile -NonInteractive -ExecutionPolicy Bypass -File "{0}" -Mode Run' -f $ScriptPath
    $taskSettings = @{
        MultipleInstances  = 'IgnoreNew'
        ExecutionTimeLimit = New-TimeSpan -Minutes 10
        StartWhenAvailable = $true
    }
    if ($Account) {
        $principal = New-ScheduledTaskPrincipal -UserId $Account -LogonType Password -RunLevel Highest
    } else {
        $principal = New-ScheduledTaskPrincipal -UserId 'SYSTEM' -LogonType ServiceAccount -RunLevel Highest
    }
    $interval = New-TimeSpan -Minutes $Minutes
    $task = @{
        TaskName  = 'NPS-Sync'
        TaskPath  = $taskPath
        Action    = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument $argument
        Trigger   = New-ScheduledTaskTrigger -Once -At (Get-Date).Date -RepetitionInterval $interval
        Settings  = New-ScheduledTaskSettingsSet @taskSettings
        Principal = $principal
        Force     = $true
    }
    Register-ScheduledTask @task | Out-Null
}

function Register-NoticeTask {
    param([Parameter(Mandatory)][string]$ScriptPath)

    $argument = '-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File "{0}" -Mode Notice' -f $ScriptPath
    $task = @{
        TaskName  = 'NPS-Sync-Notice'
        TaskPath  = $taskPath
        Action    = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument $argument
        Trigger   = New-ScheduledTaskTrigger -AtLogOn
        # runs in the session of the administrator who logs on, so the popup is visible
        Principal = New-ScheduledTaskPrincipal -GroupId $builtinAdministrators -RunLevel Limited
        Force     = $true
    }
    Register-ScheduledTask @task | Out-Null
}

$config = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'nps-sync.json') -Raw | ConvertFrom-Json
if ($config.Alias -like 'CHANGE-ME*') {
    throw 'Set the DNS alias in nps-sync.json first.'
}

$syncScript = Join-Path $PSScriptRoot 'Sync-NpsConfig.ps1'
Register-SyncEventSource
Protect-NpsSyncFolder -Path $config.WorkFolder
Register-SyncTask -ScriptPath $syncScript
Register-NoticeTask -ScriptPath $syncScript

Get-ScheduledTask -TaskPath $taskPath | Where-Object { $_.TaskName -like 'NPS-Sync*' } | Select-Object TaskName, State
