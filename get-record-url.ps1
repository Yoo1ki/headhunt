# Headhunt.cc - Arknights: Endfield import URL helper
#
# What this script does:
# 1. Reads the local Endfield webview cache in read-only mode.
# 2. Finds the most recent official GRYPHLINE URL containing a gacha token.
# 3. Rebuilds it as a consistent Headhunt.cc-compatible import URL.
# 4. Copies that URL to the clipboard.
#
# This script does NOT upload data, contact a third-party server, modify game
# files, request administrator access, or save the token anywhere.

$CachePath = Join-Path $env:LOCALAPPDATA "PlatformProcess\Cache\data_1"
$CanonicalImportEndpoint = "https://ef-webview.gryphline.com/api/record/char"
$ImportLanguage = "en-us"
$CharacterPoolType = "E_CharacterGachaPoolType_Special"

# Query parameters are validated separately, keeping this rule easy to audit.
$GryphlineUrlPattern = [regex]::new(
    'https://[A-Za-z0-9.-]+\.gryphline\.com/[A-Za-z0-9._~:/?#\[\]@!$&''()*+,;=%-]+',
    [Text.RegularExpressions.RegexOptions]::Compiled
)

function Read-FileWithoutLocking {
    param([Parameter(Mandatory = $true)][string]$Path)

    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        throw "Cache file not found: $Path"
    }

    $MaximumAttempts = 10
    $RetryDelayMilliseconds = 300

    for ($Attempt = 1; $Attempt -le $MaximumAttempts; $Attempt++) {
        $FileStream = $null
        $MemoryStream = $null

        try {
            $FileStream = [System.IO.File]::Open(
                $Path,
                [System.IO.FileMode]::Open,
                [System.IO.FileAccess]::Read,
                [System.IO.FileShare]::ReadWrite -bor [System.IO.FileShare]::Delete
            )
            $MemoryStream = New-Object System.IO.MemoryStream
            $FileStream.CopyTo($MemoryStream)

            return $MemoryStream.ToArray()
        }
        catch {
            if ($Attempt -eq $MaximumAttempts) {
                throw "The cache file is still unavailable after $MaximumAttempts attempts."
            }
            Start-Sleep -Milliseconds $RetryDelayMilliseconds
        }
        finally {
            if ($MemoryStream) { $MemoryStream.Dispose() }
            if ($FileStream) { $FileStream.Dispose() }
        }
    }
}

function ConvertFrom-QueryString {
    param([Parameter(Mandatory = $true)][string]$Query)

    $Parameters = @{}

    foreach ($Pair in $Query.TrimStart('?').Split('&')) {
        if (-not $Pair) { continue }

        $Parts = $Pair.Split('=', 2)
        $Name = [Uri]::UnescapeDataString($Parts[0])
        $Value = if ($Parts.Count -eq 2) {
            [Uri]::UnescapeDataString($Parts[1])
        }
        else {
            ""
        }

        $Parameters[$Name] = $Value
    }

    return $Parameters
}

function Find-LatestImportCredential {
    param([Parameter(Mandatory = $true)][byte[]]$Bytes)

    # ISO-8859-1 preserves every byte one-to-one, allowing embedded ASCII URLs
    # to be searched without interpreting the rest of the binary cache.
    $CacheText = [Text.Encoding]::GetEncoding("ISO-8859-1").GetString($Bytes)
    $UrlMatches = $GryphlineUrlPattern.Matches($CacheText)

    # The last valid match is normally the most recently opened history page.
    for ($Index = $UrlMatches.Count - 1; $Index -ge 0; $Index--) {
        try {
            $Candidate = [Uri]$UrlMatches[$Index].Value
            $Parameters = ConvertFrom-QueryString -Query $Candidate.Query

            $Token = if ($Parameters.ContainsKey('token')) {
                $Parameters['token']
            }
            else {
                $Parameters['u8_token']
            }

            $ServerId = if ($Parameters.ContainsKey('server_id')) {
                $Parameters['server_id']
            }
            else {
                $Parameters['server']
            }

            if ($Token -and $ServerId) {
                return @{
                    Token    = $Token
                    ServerId = $ServerId
                }
            }
        }
        catch {
            # Ignore malformed cache fragments and continue to older matches.
        }
    }

    return $null
}

function New-CanonicalImportUrl {
    param(
        [Parameter(Mandatory = $true)][string]$Token,
        [Parameter(Mandatory = $true)][string]$ServerId
    )

    $EncodedToken = [Uri]::EscapeDataString($Token)
    $EncodedServerId = [Uri]::EscapeDataString($ServerId)

    return "${CanonicalImportEndpoint}?lang=${ImportLanguage}&pool_type=${CharacterPoolType}&token=${EncodedToken}&server_id=${EncodedServerId}"
}

try {
    Write-Host "Reading the Endfield cache in read-only mode..." -ForegroundColor Yellow

    $CacheBytes = Read-FileWithoutLocking -Path $CachePath
    $Credential = Find-LatestImportCredential -Bytes $CacheBytes

    if (-not $Credential) {
        throw "No import URL was found. Open Headhunting Details in the game, then try again."
    }

    $ImportUrl = New-CanonicalImportUrl `
        -Token $Credential.Token `
        -ServerId $Credential.ServerId

    Set-Clipboard -Value $ImportUrl

    Write-Host "Success! The canonical import URL was copied to your clipboard:" -ForegroundColor Green
    Write-Host $ImportUrl
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
