const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const wikiMapping = {
  'sun-pharma': 'Sun Pharmaceutical',
  'cipla': 'Cipla',
  'dr-reddys': 'Dr. Reddy\'s Laboratories',
  'zydus': 'Zydus Lifesciences',
  'lupin': 'Lupin Limited',
  'abbott': 'Abbott Laboratories',
  'pfizer': 'Pfizer',
  'gsk': 'GlaxoSmithKline',
  'novartis': 'Novartis',
  'sanofi': 'Sanofi',
  'mankind': 'Mankind Pharma',
  'torrent': 'Torrent Pharmaceuticals',
  'alkem': 'Alkem Laboratories',
  'intas': 'Intas Pharmaceuticals',
  'glenmark': 'Glenmark Pharmaceuticals',
  'emcure': 'Emcure Pharmaceuticals',
  'wockhardt': 'Wockhardt',
  'ajanta': 'Ajanta Pharma',
  'jb-chemicals': 'J.B. Chemicals & Pharmaceuticals',
  'micro-labs': 'Micro Labs',
  'himalaya': 'Himalaya Wellness Company',
  'dabur': 'Dabur',
  'bayer': 'Bayer AG',
  'jnj': 'Johnson & Johnson',
  'reckitt': 'Reckitt',
  'merck': 'Merck & Co.',
  'astrazeneca': 'AstraZeneca',
  'boehringer': 'Boehringer Ingelheim',
  'roche': 'Hoffmann-La Roche',
  'biocon': 'Biocon',
  'ipca': 'Ipca Laboratories',
  'granules': 'Granules India',
  'divis': 'Divi\'s Laboratories',
  'strides': 'Strides Pharma Science',
  'aristo': 'Aristo Pharmaceuticals',
  'fdc': 'FDC Limited',
  'cadila': 'Cadila Pharmaceuticals',
  'pg': 'Procter & Gamble',
  'usv': 'USV Private Limited',
  'centaur': 'Centaur Pharmaceuticals',
  'eris': 'Eris Lifesciences',
  'systopic': 'Systopic Laboratories',
  'elder': 'Elder Pharmaceuticals',
  'shreya': 'Shreya Life Sciences',
  'indoco': 'Indoco Remedies',
  'natco': 'Natco Pharma',
  'agio': 'Agio Pharmaceuticals',
  'aarti-drugs': 'Aarti Drugs'
};

// Fallback high quality logo images (SVG/PNG) from direct sources if Wikipedia doesn't have it or has building photos
const directFallbacks = {
  'novartis': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Novartis-Logo.svg',
  'sanofi': 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Sanofi_logo.svg',
  'wockhardt': 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Wockhardt_logo.svg',
  'systopic': 'https://www.systopic.com/images/logo.png',
  'shreya': 'https://shreya.co.in/wp-content/uploads/2017/09/logo-small.png',
  'agio': 'https://agio-pharma.com/wp-content/uploads/2021/11/logo.png',
  'centaur': 'https://www.centaurpharma.com/wp-content/themes/centaur/images/logo.png',
  'micro-labs': 'https://upload.wikimedia.org/wikipedia/en/2/2c/Micro_Labs_logo.png',
  'aristo': 'https://upload.wikimedia.org/wikipedia/en/a/a1/Aristo_Pharmaceuticals_logo.svg',
  'usv': 'https://upload.wikimedia.org/wikipedia/en/u/us/USV_Limited_logo.png'
};

function getJson(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Handle redirect
        downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Status: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function getWikiLogo(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=400`;
  try {
    const json = await getJson(url);
    const pages = json.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId !== '-1' && pages[pageId].thumbnail) {
      return pages[pageId].thumbnail.source;
    }
  } catch (err) {
    // ignore
  }
  return null;
}

async function run() {
  console.log('Starting corporate logo downloadeer...');
  for (const [slug, title] of Object.entries(wikiMapping)) {
    console.log(`Processing ${slug}...`);
    let logoUrl = null;

    // Check direct fallback first (especially for companies known to have bad/missing/building images on Wikipedia)
    if (directFallbacks[slug]) {
      logoUrl = directFallbacks[slug];
      console.log(`  Found direct fallback URL: ${logoUrl}`);
    } else {
      logoUrl = await getWikiLogo(title);
      if (logoUrl) {
        console.log(`  Found Wikipedia image: ${logoUrl}`);
      } else {
        // Fallback: search-like API query or Google favicon fallback
        logoUrl = `https://www.google.com/s2/favicons?domain=${slug}.com&sz=128`;
        console.log(`  Wikipedia image not found. Using favicon URL: ${logoUrl}`);
      }
    }

    if (logoUrl) {
      const ext = logoUrl.toLowerCase().includes('.svg') ? '.svg' : '.png';
      const destFile = path.join(outDir, `${slug}${ext}`);
      
      // Also delete the opposite extension if it exists to avoid caching/collision issues
      const altExt = ext === '.svg' ? '.png' : '.svg';
      const altFile = path.join(outDir, `${slug}${altExt}`);
      if (fs.existsSync(altFile)) {
        try { fs.unlinkSync(altFile); } catch(e){}
      }

      try {
        await downloadFile(logoUrl, destFile);
        console.log(`  Successfully downloaded to ${slug}${ext}`);
      } catch (err) {
        console.error(`  Failed to download from ${logoUrl}: ${err.message}`);
        // Fallback to favicon as last resort
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${slug}.com&sz=128`;
        try {
          await downloadFile(faviconUrl, path.join(outDir, `${slug}.png`));
          console.log(`  Successfully fell back to favicon for ${slug}`);
        } catch (favErr) {
          console.error(`  Favicon fallback also failed for ${slug}: ${favErr.message}`);
        }
      }
    }
  }
  console.log('All downloads completed!');
}

run();
