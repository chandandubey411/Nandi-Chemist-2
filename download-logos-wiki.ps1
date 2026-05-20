# Download pharma logos using direct upload.wikimedia.org URLs
# These worked in v1 script! (dabur, bayer, reckitt confirmed downloaded)
# Run: .\download-logos-wiki.ps1

$logoDir = ".\public\logos"
if (!(Test-Path $logoDir)) { New-Item -ItemType Directory -Path $logoDir | Out-Null }

# Direct upload.wikimedia.org URLs — no DNS issues, confirmed accessible
$companies = @(
    @{ slug="sun-pharma";   url="https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Sun_Pharmaceutical_logo.svg/300px-Sun_Pharmaceutical_logo.svg.png" },
    @{ slug="dr-reddys";    url="https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Dr._Reddy%27s_Laboratories_logo.svg/300px-Dr._Reddy%27s_Laboratories_logo.svg.png" },
    @{ slug="zydus";        url="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zydus_Lifesciences_logo.svg/300px-Zydus_Lifesciences_logo.svg.png" },
    @{ slug="lupin";        url="https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Lupin_Limited_logo.svg/300px-Lupin_Limited_logo.svg.png" },
    @{ slug="abbott";       url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Abbott_Laboratories_logo.svg/300px-Abbott_Laboratories_logo.svg.png" },
    @{ slug="pfizer";       url="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Pfizer_%282021%29.svg/300px-Pfizer_%282021%29.svg.png" },
    @{ slug="gsk";          url="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/GSK_logo_2022.svg/300px-GSK_logo_2022.svg.png" },
    @{ slug="novartis";     url="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Novartis-Logo.svg/300px-Novartis-Logo.svg.png" },
    @{ slug="sanofi";       url="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Sanofi_logo.svg/300px-Sanofi_logo.svg.png" },
    @{ slug="mankind";      url="https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Mankind_Pharma_Logo.svg/300px-Mankind_Pharma_Logo.svg.png" },
    @{ slug="alkem";        url="https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/Alkem_Laboratories_Logo.svg/300px-Alkem_Laboratories_Logo.svg.png" },
    @{ slug="intas";        url="https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Intas_Pharmaceuticals.svg/300px-Intas_Pharmaceuticals.svg.png" },
    @{ slug="glenmark";     url="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Glenmark_Pharmaceuticals_logo.svg/300px-Glenmark_Pharmaceuticals_logo.svg.png" },
    @{ slug="emcure";       url="https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Emcure_Pharmaceuticals_logo.svg/300px-Emcure_Pharmaceuticals_logo.svg.png" },
    @{ slug="ajanta";       url="https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Ajanta_Pharma_logo.png/300px-Ajanta_Pharma_logo.png" },
    @{ slug="jb-chemicals"; url="https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/JB_Chemicals_%26_Pharmaceuticals_Logo.png/300px-JB_Chemicals_%26_Pharmaceuticals_Logo.png" },
    @{ slug="micro-labs";   url="https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Micro_Labs_logo.png/300px-Micro_Labs_logo.png" },
    @{ slug="himalaya";     url="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Himalaya_Drug_Company_Logo.svg/300px-Himalaya_Drug_Company_Logo.svg.png" },
    @{ slug="jnj";          url="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Johnson_%26_Johnson_logo.svg/300px-Johnson_%26_Johnson_logo.svg.png" },
    @{ slug="merck";        url="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Merck_%26_Co.svg/300px-Merck_%26_Co.svg.png" },
    @{ slug="astrazeneca";  url="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/AstraZeneca_logo.svg/300px-AstraZeneca_logo.svg.png" },
    @{ slug="boehringer";   url="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Boehringer_Ingelheim_Logo.svg/300px-Boehringer_Ingelheim_Logo.svg.png" },
    @{ slug="roche";        url="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Hoffmann-La_Roche_logo.svg/300px-Hoffmann-La_Roche_logo.svg.png" },
    @{ slug="biocon";       url="https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Biocon_logo.svg/300px-Biocon_logo.svg.png" },
    @{ slug="ipca";         url="https://upload.wikimedia.org/wikipedia/en/thumb/8/86/IPCA_Laboratories_logo.svg/300px-IPCA_Laboratories_logo.svg.png" },
    @{ slug="granules";     url="https://upload.wikimedia.org/wikipedia/en/thumb/g/ga/Granules_India_logo.png/300px-Granules_India_logo.png" },
    @{ slug="divis";        url="https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Divi%27s_Laboratories_logo.svg/300px-Divi%27s_Laboratories_logo.svg.png" },
    @{ slug="strides";      url="https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Strides_Pharma_Science_logo.svg/300px-Strides_Pharma_Science_logo.svg.png" },
    @{ slug="fdc";          url="https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/FDC_Limited_Logo.png/300px-FDC_Limited_Logo.png" },
    @{ slug="cadila";       url="https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Cadila_Pharmaceuticals.svg/300px-Cadila_Pharmaceuticals.svg.png" },
    @{ slug="pg";           url="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Procter_%26_Gamble_logo_2013.svg/300px-Procter_%26_Gamble_logo_2013.svg.png" },
    @{ slug="usv";          url="https://upload.wikimedia.org/wikipedia/en/thumb/u/us/USV_Limited_logo.png/300px-USV_Limited_logo.png" },
    @{ slug="eris";         url="https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Eris_Lifesciences_logo.png/300px-Eris_Lifesciences_logo.png" },
    @{ slug="indoco";       url="https://upload.wikimedia.org/wikipedia/en/thumb/i/in/Indoco_Remedies_logo.png/300px-Indoco_Remedies_logo.png" },
    @{ slug="natco";        url="https://upload.wikimedia.org/wikipedia/en/thumb/n/na/NATCO_Pharma_logo.png/300px-NATCO_Pharma_logo.png" },
    @{ slug="aarti-drugs";  url="https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Aarti_Drugs_logo.png/300px-Aarti_Drugs_logo.png" }
)

$success = 0
$failed = 0

foreach ($co in $companies) {
    $dest = "$logoDir\$($co.slug).png"
    
    if ((Test-Path $dest) -and (Get-Item $dest).Length -gt 800) {
        Write-Host "  [SKIP]   $($co.slug)" -ForegroundColor Yellow
        $success++
        continue
    }
    
    try {
        $wc = New-Object System.Net.WebClient
        $wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
        $wc.Headers.Add("Referer", "https://en.wikipedia.org/")
        $wc.DownloadFile($co.url, $dest)
        
        if ((Test-Path $dest) -and (Get-Item $dest).Length -gt 800) {
            Write-Host "  [OK]     $($co.slug)" -ForegroundColor Green
            $success++
        } else {
            if (Test-Path $dest) { Remove-Item $dest -Force }
            Write-Host "  [SMALL]  $($co.slug)" -ForegroundColor Red
            $failed++
        }
    } catch {
        if (Test-Path $dest) { Remove-Item $dest -Force }
        Write-Host ("  [ERR]    " + $co.slug + " - " + $_.Exception.Message) -ForegroundColor Red
        $failed++
    }
    
    Start-Sleep -Milliseconds 300
}

Write-Host ""
Write-Host "Done! Got: $success / $($companies.Count)  Failed: $failed" -ForegroundColor Cyan
