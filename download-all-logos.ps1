$logosDir = "$PSScriptRoot\public\logos"
if (!(Test-Path $logosDir)) { New-Item -ItemType Directory -Path $logosDir | Out-Null }

$headers = @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }

# Each slug => URLs to try in order
$brands = [ordered]@{}
$brands["sun-pharma"]   = "https://logo.clearbit.com/sunpharma.com"
$brands["cipla"]        = "https://logo.clearbit.com/cipla.com"
$brands["dr-reddys"]    = "https://logo.clearbit.com/drreddys.com"
$brands["zydus"]        = "https://logo.clearbit.com/zyduslife.com"
$brands["lupin"]        = "https://logo.clearbit.com/lupin.com"
$brands["abbott"]       = "https://logo.clearbit.com/abbott.com"
$brands["pfizer"]       = "https://logo.clearbit.com/pfizer.com"
$brands["gsk"]          = "https://logo.clearbit.com/gsk.com"
$brands["novartis"]     = "https://logo.clearbit.com/novartis.com"
$brands["sanofi"]       = "https://logo.clearbit.com/sanofi.com"
$brands["mankind"]      = "https://logo.clearbit.com/mankindpharma.com"
$brands["torrent"]      = "https://logo.clearbit.com/torrentpharma.com"
$brands["alkem"]        = "https://logo.clearbit.com/alkemlaboratories.com"
$brands["intas"]        = "https://logo.clearbit.com/intaspharma.com"
$brands["glenmark"]     = "https://logo.clearbit.com/glenmarkpharma.com"
$brands["emcure"]       = "https://logo.clearbit.com/emcure.co.in"
$brands["wockhardt"]    = "https://logo.clearbit.com/wockhardt.com"
$brands["ajanta"]       = "https://logo.clearbit.com/ajantapharma.com"
$brands["jb-chemicals"] = "https://logo.clearbit.com/jbcpl.com"
$brands["micro-labs"]   = "https://logo.clearbit.com/microlabsltd.com"
$brands["himalaya"]     = "https://logo.clearbit.com/himalayawellness.com"
$brands["dabur"]        = "https://logo.clearbit.com/dabur.com"
$brands["bayer"]        = "https://logo.clearbit.com/bayer.com"
$brands["jnj"]          = "https://logo.clearbit.com/jnj.com"
$brands["reckitt"]      = "https://logo.clearbit.com/reckitt.com"
$brands["merck"]        = "https://logo.clearbit.com/merck.com"
$brands["astrazeneca"]  = "https://logo.clearbit.com/astrazeneca.com"
$brands["boehringer"]   = "https://logo.clearbit.com/boehringer-ingelheim.com"
$brands["roche"]        = "https://logo.clearbit.com/roche.com"
$brands["biocon"]       = "https://logo.clearbit.com/biocon.com"
$brands["ipca"]         = "https://logo.clearbit.com/ipcalabs.com"
$brands["granules"]     = "https://logo.clearbit.com/granulesindia.com"
$brands["divis"]        = "https://logo.clearbit.com/divislabs.com"
$brands["strides"]      = "https://logo.clearbit.com/strides.com"
$brands["aristo"]       = "https://logo.clearbit.com/aristopharma.com"
$brands["fdc"]          = "https://logo.clearbit.com/fdclimited.com"
$brands["cadila"]       = "https://logo.clearbit.com/zyduscadila.com"
$brands["pg"]           = "https://logo.clearbit.com/pg.com"
$brands["usv"]          = "https://logo.clearbit.com/usvpvtltd.com"
$brands["centaur"]      = "https://logo.clearbit.com/centaurpharma.com"
$brands["eris"]         = "https://logo.clearbit.com/erislifesciences.com"
$brands["systopic"]     = "https://logo.clearbit.com/systopiclabs.com"
$brands["elder"]        = "https://logo.clearbit.com/elderpharma.com"
$brands["shreya"]       = "https://logo.clearbit.com/shreyalife.com"
$brands["indoco"]       = "https://logo.clearbit.com/indoco.com"
$brands["natco"]        = "https://logo.clearbit.com/natcopharma.com"
$brands["agio"]         = "https://logo.clearbit.com/agiopharma.com"
$brands["aarti-drugs"]  = "https://logo.clearbit.com/aartidrugs.co.in"

$success = 0
$skipped = 0
$failed  = @()

foreach ($slug in $brands.Keys) {
    $outFile = Join-Path $logosDir "$slug.png"
    $url     = $brands[$slug]

    if ((Test-Path $outFile) -and (Get-Item $outFile).Length -gt 1000) {
        Write-Host "  SKIP  $slug" -ForegroundColor DarkGray
        $skipped++
        continue
    }

    try {
        Invoke-WebRequest -Uri $url -Headers $headers -OutFile $outFile -TimeoutSec 15 -ErrorAction Stop
        $size = (Get-Item $outFile).Length
        if ($size -gt 500) {
            Write-Host "  OK    $slug  ($size bytes)" -ForegroundColor Green
            $success++
        } else {
            Write-Host "  TINY  $slug ($size bytes) - skipping" -ForegroundColor Yellow
            Remove-Item $outFile -ErrorAction SilentlyContinue
            $failed += $slug
        }
    } catch {
        Write-Host "  FAIL  $slug - $($_.Exception.Message)" -ForegroundColor Red
        $failed += $slug
    }

    Start-Sleep -Milliseconds 400
}

Write-Host ""
Write-Host "============================" -ForegroundColor Cyan
Write-Host "  Downloaded : $success" -ForegroundColor Green
Write-Host "  Skipped    : $skipped" -ForegroundColor DarkGray
Write-Host "  Failed     : $($failed.Count)" -ForegroundColor Red
if ($failed.Count -gt 0) {
    Write-Host "  Failed: $($failed -join ', ')" -ForegroundColor Yellow
}
Write-Host "============================" -ForegroundColor Cyan
