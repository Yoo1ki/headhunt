$CachePath = Join-Path $env:LOCALAPPDATA "PlatformProcess\Cache\data_1"
$UrlRegex = [regex]::new('https://[A-Za-z0-9.\-]+\.gryphline\.com/[A-Za-z0-9._~\-/?&=%+]*?token=[A-Za-z0-9._~\-/?&=%+]*?server=[A-Za-z0-9._~\-/?&=%+]+',[Text.RegularExpressions.RegexOptions]::Compiled)

function Copy-CacheFile{
    if(!(Test-Path $CachePath)){throw "Cache file not found: $CachePath"}
    $tmp=Join-Path $env:TEMP ("cache_{0}.tmp"-f([guid]::NewGuid().ToString("N")))
    $s=$null;$d=$null
    try{
        $s=[IO.File]::Open($CachePath,'Open','Read','ReadWrite')
        $d=[IO.File]::Create($tmp)
        $s.CopyTo($d)
        return $tmp
    }finally{
        if($s){$s.Dispose()}
        if($d){$d.Dispose()}
    }
}

function Get-LastUrlFromCache($Path){
    if(!(Test-Path $Path)){return $null}
    $t=[Text.Encoding]::GetEncoding("ISO-8859-1").GetString([IO.File]::ReadAllBytes($Path))
    $m=$UrlRegex.Matches($t)
    if($m.Count -eq 0){return $null}
    return $m[$m.Count-1].Value
}

function Remove-TempFile($Path){
    if($Path -and (Test-Path $Path)){Remove-Item $Path -Force -ErrorAction SilentlyContinue}
}

function Show-Result($Url){
    Write-Host "Success! URL copied to clipboard:" -ForegroundColor Green
    Write-Host $Url
}

try{
    Write-Host "Reading Arkninght:Endfield cache file..." -ForegroundColor Yellow
    $tmp=Copy-CacheFile
    $url=Get-LastUrlFromCache $tmp

    if(!$url){throw "No matching URL found. Make sure tracker page is opened in-game."}

    Set-Clipboard $url
    Show-Result $url
}
catch{
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
finally{
    Remove-TempFile $tmp
}