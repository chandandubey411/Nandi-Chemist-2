# Create logos directory if it doesn't exist
$OutDir = Join-Path $PSScriptRoot "public/logos"
if (!(Test-Path $OutDir)) {
    New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
}

# Slugs mapping to Wikipedia titles
$WikiMapping = @{
    "sun-pharma" = "Sun_Pharmaceutical"
    "cipla" = "Cipla"
    "dr-reddys" = "Dr._Reddy%27s_Laboratories"
    "zydus" = "Zydus_Lifesciences"
    "lupin" = "Lupin_Limited"
    "abbott" = "Abbott_Laboratories"
    "pfizer" = "Pfizer"
    "mankind" = "Mankind_Pharma"
    "torrent" = "Torrent_Pharmaceuticals"
    "alkem" = "Alkem_Laboratories"
    "intas" = "Intas_Pharmaceuticals"
    "glenmark" = "Glenmark_Pharmaceuticals"
    "emcure" = "Emcure_Pharmaceuticals"
    "ajanta" = "Ajanta_Pharma"
    "himalaya" = "Himalaya_Wellness_Company"
    "dabur" = "Dabur"
    "astrazeneca" = "AstraZeneca"
    "boehringer" = "Boehringer_Ingelheim"
    "roche" = "Hoffmann-La_Roche"
    "biocon" = "Biocon"
    "ipca" = "Ipca_Laboratories"
    "divis" = "Divi%27s_Laboratories"
    "strides" = "Strides_Pharma_Science"
    "cadila" = "Cadila_Pharmaceuticals"
    "pg" = "Procter_%26_Gamble"
    "elder" = "Elder_Pharmaceuticals"
}

# Direct URLs to bypass Wikipedia pageimages API (e.g. to avoid building photos or missing logo pages)
$DirectUrls = @{
    "novartis" = "https://upload.wikimedia.org/wikipedia/commons/6/68/Novartis-Logo.svg"
    "sanofi" = "https://upload.wikimedia.org/wikipedia/commons/c/c2/Sanofi_logo.svg"
    "wockhardt" = "https://upload.wikimedia.org/wikipedia/commons/c/c0/Wockhardt_logo.svg"
    "gsk" = "https://upload.wikimedia.org/wikipedia/commons/6/6f/GSK_logo_2022.svg"
    "jnj" = "https://upload.wikimedia.org/wikipedia/commons/7/71/Johnson_%26_Johnson_logo.svg"
    "reckitt" = "https://upload.wikimedia.org/wikipedia/commons/3/38/Reckitt_logo.svg"
    "merck" = "https://upload.wikimedia.org/wikipedia/commons/b/bb/Merck_%26_Co.svg"
    "bayer" = "https://upload.wikimedia.org/wikipedia/commons/2/28/Bayer_AG_logo.svg"
    "micro-labs" = "https://upload.wikimedia.org/wikipedia/en/2/2c/Micro_Labs_logo.png"
    "jb-chemicals" = "https://upload.wikimedia.org/wikipedia/en/b/b6/JB_Chemicals_%26_Pharmaceuticals_Logo.png"
    "granules" = "https://upload.wikimedia.org/wikipedia/en/g/ga/Granules_India_logo.png"
    "fdc" = "https://upload.wikimedia.org/wikipedia/en/f/fd/FDC_Limited_Logo.png"
    "usv" = "https://upload.wikimedia.org/wikipedia/en/u/us/USV_Limited_logo.png"
    "eris" = "https://upload.wikimedia.org/wikipedia/en/e/e9/Eris_Lifesciences_logo.png"
    "indoco" = "https://upload.wikimedia.org/wikipedia/en/i/in/Indoco_Remedies_logo.png"
    "natco" = "https://upload.wikimedia.org/wikipedia/en/n/na/NATCO_Pharma_logo.png"
    "aarti-drugs" = "https://upload.wikimedia.org/wikipedia/en/a/aa/Aarti_Drugs_logo.png"
    "systopic" = "https://www.systopic.com/images/logo.png"
    "shreya" = "https://shreya.co.in/wp-content/uploads/2017/09/logo-small.png"
    "agio" = "https://agio-pharma.com/wp-content/uploads/2021/11/logo.png"
    "centaur" = "https://www.centaurpharma.com/wp-content/themes/centaur/images/logo.png"
    "aristo" = "https://upload.wikimedia.org/wikipedia/commons/a/a1/Aristo_Pharmaceuticals_logo.svg"
}

# Domains fallback mapping for google favicon service
$DomainsFallback = @{
    "sun-pharma" = "sunpharma.com"
    "cipla" = "cipla.com"
    "dr-reddys" = "drreddys.com"
    "zydus" = "zyduslife.com"
    "lupin" = "lupin.com"
    "abbott" = "abbott.in"
    "pfizer" = "pfizer.com"
    "gsk" = "gsk.com"
    "novartis" = "novartis.com"
    "sanofi" = "sanofi.com"
    "mankind" = "mankindpharma.com"
    "torrent" = "torrentpharma.com"
    "alkem" = "alkemlabs.com"
    "intas" = "intaspharma.com"
    "glenmark" = "glenmarkpharma.com"
    "emcure" = "emcure.com"
    "wockhardt" = "wockhardt.com"
    "ajanta" = "ajantapharma.com"
    "jb-chemicals" = "jbcpl.com"
    "micro-labs" = "microlabsltd.com"
    "himalaya" = "himalayawellness.in"
    "dabur" = "dabur.com"
    "bayer" = "bayer.in"
    "jnj" = "jnj.com"
    "reckitt" = "reckitt.com"
    "merck" = "merck.com"
    "astrazeneca" = "astrazeneca.com"
    "boehringer" = "boehringer-ingelheim.com"
    "roche" = "roche.com"
    "biocon" = "biocon.com"
    "ipca" = "ipcalabs.com"
    "granules" = "granulesindia.com"
    "divis" = "divislabs.com"
    "strides" = "stridespharma.com"
    "aristo" = "aristopharma.org"
    "fdc" = "fdclimited.com"
    "cadila" = "cadilapharma.com"
    "pg" = "pg.com"
    "usv" = "usvpvtltd.com"
    "centaur" = "centaurpharma.com"
    "eris" = "erislifesciences.com"
    "systopic" = "systopic.com"
    "elder" = "elderpharma.com"
    "shreya" = "shreyalife.com"
    "indoco" = "indoco.com"
    "natco" = "natcopharma.com"
    "agio" = "agio-pharma.com"
    "aarti-drugs" = "aartidrugs.co.in"
}

# List of all slugs
$AllSlugs = $DomainsFallback.Keys | Sort-Object

Write-Host "Starting Logo Download with Status Verification..."

foreach ($Slug in $AllSlugs) {
    Write-Host "----------------------------"
    Write-Host "Processing: $Slug"
    $Url = ""
    $Extension = ".png"

    # 1. Check if direct URL is defined
    if ($DirectUrls.ContainsKey($Slug)) {
        $Url = $DirectUrls[$Slug]
        if ($Url.EndsWith(".svg")) { $Extension = ".svg" }
        Write-Host "  Using Direct URL: $Url"
    }
    # 2. Otherwise query Wikipedia API
    elseif ($WikiMapping.ContainsKey($Slug)) {
        $WikiTitle = $WikiMapping[$Slug]
        $ApiUrl = "https://en.wikipedia.org/w/api.php?action=query&titles=$WikiTitle&prop=pageimages&format=json&pithumbsize=400"
        
        try {
            $TempFile = [System.IO.Path]::GetTempFileName()
            & curl.exe -s -A "NandiChemistLogoDownloader/1.0 (support@nandichemist.com)" $ApiUrl -o $TempFile
            $Response = Get-Content $TempFile -Raw | ConvertFrom-Json
            Remove-Item $TempFile -ErrorAction SilentlyContinue

            $Pages = $Response.query.pages
            $PageId = ($Pages.psobject.properties.name)[0]
            
            if ($PageId -ne "-1" -and $Pages.$PageId.thumbnail) {
                $Url = $Pages.$PageId.thumbnail.source
                if ($Url.ToLower().Contains(".svg")) { $Extension = ".svg" }
                Write-Host "  Found Wiki Thumbnail: $Url"
            }
        } catch {
            Write-Host "  Wiki API lookup failed: $_"
        }
    }

    # Clean up both extensions before downloading to avoid conflict
    $PngFile = Join-Path $OutDir "$Slug.png"
    $SvgFile = Join-Path $OutDir "$Slug.svg"

    # 3. Attempt download if URL was found
    $DownloadedSuccessfully = $false
    if (![string]::IsNullOrEmpty($Url)) {
        $DestFile = Join-Path $OutDir "$Slug$Extension"
        Write-Host "  Downloading to: $DestFile"
        try {
            # Run curl and capture status code
            $StatusCode = & curl.exe -L -s -w "%{http_code}" -A "NandiChemistLogoDownloader/1.0 (support@nandichemist.com)" $Url -o $DestFile
            if ($StatusCode -eq "200") {
                $Size = (Get-Item $DestFile).Length
                Write-Host "  Successfully downloaded from source ($Size bytes)"
                $DownloadedSuccessfully = $true
            } else {
                Write-Host "  Source download failed with HTTP status: $StatusCode"
                if (Test-Path $DestFile) { Remove-Item $DestFile -Force }
            }
        } catch {
            Write-Host "  Download error: $_"
            if (Test-Path $DestFile) { Remove-Item $DestFile -Force }
        }
    }

    # 4. Fallback to Google Favicon if not yet downloaded successfully
    if (!$DownloadedSuccessfully) {
        if (Test-Path $PngFile) { Remove-Item $PngFile -Force }
        if (Test-Path $SvgFile) { Remove-Item $SvgFile -Force }
        
        $Domain = $DomainsFallback[$Slug]
        $Url = "https://www.google.com/s2/favicons?domain=$Domain&sz=128"
        $DestFile = $PngFile
        Write-Host "  Falling back to Favicon URL: $Url"
        try {
            $StatusCode = & curl.exe -L -s -w "%{http_code}" -A "NandiChemistLogoDownloader/1.0 (support@nandichemist.com)" $Url -o $DestFile
            if ($StatusCode -eq "200") {
                $Size = (Get-Item $DestFile).Length
                Write-Host "  Successfully fell back to favicon ($Size bytes)"
            } else {
                Write-Host "  Favicon fallback failed with status: $StatusCode"
                if (Test-Path $DestFile) { Remove-Item $DestFile -Force }
            }
        } catch {
            Write-Host "  Favicon download exception: $_"
            if (Test-Path $DestFile) { Remove-Item $DestFile -Force }
        }
    }
}

Write-Host "----------------------------"
Write-Host "All Logos Processed!"
