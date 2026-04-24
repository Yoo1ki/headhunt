$CachePath = Join-Path $env:LOCALAPPDATA "PlatformProcess\Cache\data_1"
$UrlRegex = [regex]::new(
    'https://[A-Za-z0-9.\-]+\.gryphline\.com/[A-Za-z0-9._~\-/?&=%+]*?token=[A-Za-z0-9._~\-/?&=%+]*?server=[A-Za-z0-9._~\-/?&=%+]+',
    [Text.RegularExpressions.RegexOptions]::Compiled
)

function Read-CacheSafely {
    param([string]$Path)

    if (!(Test-Path $Path)) {
        throw "Cache file not found: $Path"
    }

    $maxRetry = 10
    $delay = 300

    for ($i = 0; $i -lt $maxRetry; $i++) {
        try {
            $fs = [System.IO.File]::Open(
                $Path,
                [System.IO.FileMode]::Open,
                [System.IO.FileAccess]::Read,
                [System.IO.FileShare]::ReadWrite -bor [System.IO.FileShare]::Delete
            )

            $ms = New-Object System.IO.MemoryStream
            $fs.CopyTo($ms)
            $fs.Dispose()

            return $ms.ToArray()
        }
        catch {
            Start-Sleep -Milliseconds $delay
        }
    }

    throw "File still locked after retries"
}

function Get-LastUrlFromBytes {
    param([byte[]]$Bytes)

    $text = [Text.Encoding]::GetEncoding("ISO-8859-1").GetString($Bytes)

    $urlMatches = $UrlRegex.Matches($text)

    if ($urlMatches.Count -eq 0) {
        return $null
    }

    return $urlMatches[$urlMatches.Count - 1].Value
}

function Show-Result {
    param([string]$Url)

    Write-Host "Success! URL copied to clipboard:" -ForegroundColor Green
    Write-Host $Url
}

try {
    Write-Host "Reading cache file..." -ForegroundColor Yellow

    $bytes = Read-CacheSafely $CachePath
    $url = Get-LastUrlFromBytes $bytes

    if (-not $url) {
        throw "No matching URL found. Make sure tracker page is opened in-game."
    }

    Set-Clipboard $url
    Show-Result $url
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
