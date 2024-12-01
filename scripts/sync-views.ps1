# Load configuration
. "$PSScriptRoot\config.ps1"

# Create directories if needed
if (-not (Test-Path -Path $PROJECT_TEST_VIEWS)) {
    New-Item -ItemType Directory -Path $PROJECT_TEST_VIEWS -Force > $null
}
if (-not (Test-Path -Path $HA_WWW)) {
    New-Item -ItemType Directory -Path $HA_WWW -Force > $null
}

# Robocopy parameters for silent operation
$params = @("/MIR", "/FFT", "/Z", "/W:5", "/R:3", "/NDL", "/NJH", "/NJS")

function Write-Status($text) {
    $cursorTop = [Console]::CursorTop
    [Console]::Write("$text... ")
    return $cursorTop
}

function Write-Result($result, $cursorTop) {
    [Console]::SetCursorPosition([Console]::CursorLeft, $cursorTop)
    if ($result -eq "OK") {
        [Console]::ForegroundColor = [ConsoleColor]::Green
    } else {
        [Console]::ForegroundColor = [ConsoleColor]::Red
    }
    [Console]::WriteLine($result)
    [Console]::ResetColor()
}

$top = Write-Status "Syncing Dashboards"
robocopy $HA_DASHBOARDS $PROJECT_TEST_VIEWS @params | Out-Null
Write-Result $(if ($LASTEXITCODE -lt 8) { "OK" } else { "Failed!" }) $top

$top = Write-Status "Deploying Plugin"
robocopy $PROJECT_DIST $HA_WWW @params | Out-Null
Write-Result $(if ($LASTEXITCODE -lt 8) { "OK" } else { "Failed!" }) $top
