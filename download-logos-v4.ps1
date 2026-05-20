# Logo Downloader v4 - Uses Wikipedia API to get EXACT image URLs
# Step 1: Get images list from company's Wikipedia page
# Step 2: Find the logo image (prefers "logo" in filename)  
# Step 3: Get the direct upload.wikimedia.org URL via imageinfo API
# Step 4: Download it
# Run: .\download-logos-v4.ps1

$logoDir = ".\public\logos"
if (!(Test-Path $logoDir)) { New-Item -ItemType Directory -Path $logoDir | Out-Null }

$companies = @(
    @{ slug="sun-pharma";   wiki="Sun_Pharmaceutical" },
    @{ slug="dr-reddys";    wiki="Dr._Reddy's_Laboratories" },
    @{ slug="zydus";        wiki="Zydus_Lifesciences" },
    @{ slug="lupin";        wiki="Lupin_Limited" },
    @{ slug="abbott";       wiki="Abbott_India" },
    @{ slug="gsk";          wiki="GSK_plc" },
    @{ slug="mankind";      wiki="Mankind_Pharma" },
    @{ slug="torrent";      wiki="Torrent_Pharmaceuticals" },
    @{ slug="alkem";        wiki="Alkem_Laboratories" },
    @{ slug="intas";        wiki="Intas_Pharmaceuticals" },
    @{ slug="glenmark";     wiki="Glenmark_Pharmaceuticals" },
    @{ slug="emcure";       wiki="Emcure_Pharmaceuticals" },
    @{ slug="wockhardt";    wiki="Wockhardt" },
    @{ slug="ajanta";       wiki="Ajanta_Pharma" },
    @{ slug="jb-chemicals"; wiki="J.B._Chemicals_and_Pharmaceuticals" },
    @{ slug="micro-labs";   wiki="Micro_Labs_Limited" },
    @{ slug="himalaya";     wiki="Himalaya_Drug_Company" },
    @{ slug="jnj";          wiki="Johnson_%26_Johnson" },
    @{ slug="merck";        wiki="Merck_%26_Co." },
    @{ slug="astrazeneca";  wiki="AstraZeneca" },
    @{ slug="boehringer";   wiki="Boehringer_Ingelheim" },
    @{ slug="roche";        wiki="Hoffmann-La_Roche" },
    @{ slug="biocon";       wiki="Biocon" },
    @{ slug="ipca";         wiki="IPCA_Laboratories" },
    @{ slug="granules";     wiki="Granules_India" },
    @{ slug="divis";        wiki="Divi's_Laboratories" },
    @{ slug="strides";      wiki="Strides_Pharma_Science" },
    @{ slug="fdc";          wiki="FDC_Limited_(India)" },
    @{ slug="cadila";       wiki="Cadila_Pharmaceuticals" },
    @{ slug="pg";           wiki="Procter_%26_Gamble" },
    @{ slug="usv";          wiki="USV_Limited" },
    @{ slug="eris";         wiki="Eris_Lifesciences" },
    @{ slug="elder";        wiki="Elder_Pharmaceuticals" },
    @{ slug="indoco";       wiki="Indoco_Remedies" },
    @{ slug="natco";        wiki="NATCO_Pharma" },
    @{ slug="aarti-drugs";  wiki="Aarti_Drugs" },
    @{ slug="aristo";       wiki="Aristo_Pharma" },
    @{ slug="cipla";        wiki="Cipla" }
)

function Get-WikiImages {
    param([string]$wikiTitle)
    $url = "https://en.wikipedia.org/w/api.php?action=query&titles=$([Uri]::EscapeDataString($wikiTitle))&prop=images&imlimit=20&format=json"
    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 15 -UserAgent "Mozilla/5.0"
        $json = $resp.Content | ConvertFrom-Json
        $page = ($json.query.pages.PSObject.Properties | Select-Object -First 1).Value
        return $page.images | ForEach-Object { $_.title -replace '^File:', '' }
    } catch { return @() }
}

function Get-ImageDirectUrl {
    param([string]$filename)
    $encoded = [Uri]::EscapeDataString("File:$filename")
    $url = "https://en.wikipedia.org/w/api.php?action=query&titles=$encoded&prop=imageinfo&iiprop=url&iiurlwidth=300&format=json"
    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 15 -UserAgent "Mozilla/5.0"
        $json = $resp.Content | ConvertFrom-Json
        $page = ($json.query.pages.PSObject.Properties | Select-Object -First 1).Value
        # Prefer thumbnail (PNG rendition of SVG), fallback to full URL
        $thumbUrl = $page.imageinfo[0].thumburl
        $fullUrl  = $page.imageinfo[0].url
        if ($thumbUrl) { return $thumbUrl }
        return $fullUrl
    } catch { return $null }
}

function Score-ImageName {
    param([string]$name)
    $n = $name.ToLower()
    $score = 0
    if ($n -like "*logo*")       { $score += 20 }
    if ($n -like "*.svg")        { $score += 10 }
    if ($n -like "*.png")        { $score += 5  }
    if ($n -like "*wordmark*")   { $score += 8  }
    if ($n -like "*icon*")       { $score += 3  }
    if ($n -like "*.jpg")        { $score -= 5  }  # photos usually have .jpg
    if ($n -like "*building*")   { $score -= 20 }
    if ($n -like "*headquarter*"){ $score -= 20 }
    if ($n -like "*campus*")     { $score -= 20 }
    if ($n -like "*factory*")    { $score -= 20 }
    if ($n -like "*map*")        { $score -= 15 }
    return $score
}

$success = 0
$failed  = 0
$skipped = 0

foreach ($co in $companies) {
    $dest = "$logoDir\$($co.slug).png"
    
    if ((Test-Path $dest) -and (Get-Item $dest).Length -gt 800) {
        Write-Host "  [SKIP] $($co.slug)" -ForegroundColor Yellow
        $skipped++
        continue
    }
    
    Write-Host "  [...] $($co.slug)" -NoNewline -ForegroundColor Gray
    
    # Get all images from the Wikipedia page
    $images = Get-WikiImages -wikiTitle $co.wiki
    
    if (!$images -or $images.Count -eq 0) {
        Write-Host "`r  [ERR] $($co.slug) - no images found on wiki page    " -ForegroundColor Red
        $failed++
        Start-Sleep -Milliseconds 500
        continue
    }
    
    # Score and sort images to find the best logo
    $ranked = $images | ForEach-Object { 
        [PSCustomObject]@{ name=$_; score=(Score-ImageName $_) } 
    } | Sort-Object -Property score -Descending
    
    $downloaded = $false
    foreach ($img in ($ranked | Select-Object -First 5)) {
        $directUrl = Get-ImageDirectUrl -filename $img.name
        if (!$directUrl) { continue }
        
        try {
            Invoke-WebRequest -Uri $directUrl -OutFile $dest -UseBasicParsing -TimeoutSec 20 -UserAgent "Mozilla/5.0" -Headers @{ Referer = "https://en.wikipedia.org/" }
            if ((Test-Path $dest) -and (Get-Item $dest).Length -gt 800) {
                Write-Host "`r  [OK]  $($co.slug) ($($img.name.Substring(0, [Math]::Min(40, $img.name.Length))))" -ForegroundColor Green
                $success++
                $downloaded = $true
                break
            } else {
                if (Test-Path $dest) { Remove-Item $dest -Force }
            }
        } catch {
            if (Test-Path $dest) { Remove-Item $dest -Force }
        }
        Start-Sleep -Milliseconds 300
    }
    
    if (!$downloaded) {
        Write-Host "`r  [ERR] $($co.slug) - all images failed                    " -ForegroundColor Red
        $failed++
    }
    
    Start-Sleep -Milliseconds 800
}

Write-Host ""
Write-Host "Done! OK: $success  Skipped: $skipped  Failed: $failed  Total: $($companies.Count)" -ForegroundColor Cyan
Write-Host "Logos saved to: $(Resolve-Path $logoDir)" -ForegroundColor Cyan
