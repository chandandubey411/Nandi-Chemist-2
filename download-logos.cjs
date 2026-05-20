/**
 * Logo Downloader v3 — Uses Wikipedia API to find logo filenames,
 * then downloads via en.wikipedia.org/wiki/Special:Redirect/file/
 * (avoids commons.wikimedia.org which is blocked on some Indian networks)
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));

const companies = [
  { slug: 'sun-pharma',    wiki: 'Sun_Pharmaceutical' },
  { slug: 'cipla',         wiki: 'Cipla' },
  { slug: 'dr-reddys',     wiki: "Dr._Reddy's_Laboratories" },
  { slug: 'zydus',         wiki: 'Zydus_Lifesciences' },
  { slug: 'lupin',         wiki: 'Lupin_Limited' },
  { slug: 'abbott',        wiki: 'Abbott_India' },
  { slug: 'pfizer',        wiki: 'Pfizer' },
  { slug: 'gsk',           wiki: 'GSK_plc' },
  { slug: 'novartis',      wiki: 'Novartis' },
  { slug: 'sanofi',        wiki: 'Sanofi' },
  { slug: 'mankind',       wiki: 'Mankind_Pharma' },
  { slug: 'torrent',       wiki: 'Torrent_Pharmaceuticals' },
  { slug: 'alkem',         wiki: 'Alkem_Laboratories' },
  { slug: 'intas',         wiki: 'Intas_Pharmaceuticals' },
  { slug: 'glenmark',      wiki: 'Glenmark_Pharmaceuticals' },
  { slug: 'emcure',        wiki: 'Emcure_Pharmaceuticals' },
  { slug: 'wockhardt',     wiki: 'Wockhardt' },
  { slug: 'ajanta',        wiki: 'Ajanta_Pharma' },
  { slug: 'jb-chemicals',  wiki: 'J.B._Chemicals_and_Pharmaceuticals' },
  { slug: 'micro-labs',    wiki: 'Micro_Labs_Limited' },
  { slug: 'himalaya',      wiki: 'Himalaya_Drug_Company' },
  { slug: 'dabur',         wiki: 'Dabur' },
  { slug: 'bayer',         wiki: 'Bayer' },
  { slug: 'jnj',           wiki: 'Johnson_%26_Johnson' },
  { slug: 'reckitt',       wiki: 'Reckitt' },
  { slug: 'merck',         wiki: 'Merck_%26_Co.' },
  { slug: 'astrazeneca',   wiki: 'AstraZeneca' },
  { slug: 'boehringer',    wiki: 'Boehringer_Ingelheim' },
  { slug: 'roche',         wiki: 'Hoffmann-La_Roche' },
  { slug: 'biocon',        wiki: 'Biocon' },
  { slug: 'ipca',          wiki: 'IPCA_Laboratories' },
  { slug: 'granules',      wiki: 'Granules_India' },
  { slug: 'divis',         wiki: "Divi's_Laboratories" },
  { slug: 'strides',       wiki: 'Strides_Pharma_Science' },
  { slug: 'aristo',        wiki: 'Aristo_Pharma' },
  { slug: 'fdc',           wiki: 'FDC_Limited_(India)' },
  { slug: 'cadila',        wiki: 'Cadila_Pharmaceuticals' },
  { slug: 'pg',            wiki: 'Procter_%26_Gamble' },
  { slug: 'usv',           wiki: 'USV_Limited' },
  { slug: 'centaur',       wiki: 'Centaur_Pharmaceuticals' },
  { slug: 'eris',          wiki: 'Eris_Lifesciences' },
  { slug: 'systopic',      wiki: null },
  { slug: 'elder',         wiki: 'Elder_Pharmaceuticals' },
  { slug: 'shreya',        wiki: 'Shreya_Life_Sciences' },
  { slug: 'indoco',        wiki: 'Indoco_Remedies' },
  { slug: 'natco',         wiki: 'NATCO_Pharma' },
  { slug: 'agio',          wiki: null },
  { slug: 'aarti-drugs',   wiki: 'Aarti_Drugs' },
];

// ─── HTTP helpers ────────────────────────────────────────────────────────────
function request(url, opts = {}, depth = 0) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124',
        'Accept-Language': 'en-US,en;q=0.9',
        ...opts.headers,
      },
      timeout: 20000,
    }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && depth < 8) {
        res.resume();
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : `https://en.wikipedia.org${res.headers.location}`;
        return request(next, opts, depth + 1).then(resolve).catch(reject);
      }
      resolve(res);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function readJson(url) {
  try {
    const res = await request(url);
    const chunks = [];
    res.on('data', c => chunks.push(c));
    return await new Promise(r => res.on('end', () => {
      try { r(JSON.parse(Buffer.concat(chunks).toString())); } catch { r(null); }
    }));
  } catch { return null; }
}

async function downloadToFile(url, dest) {
  return new Promise(async (resolve) => {
    try {
      const res = await request(url);
      if (res.statusCode !== 200) { res.resume(); return resolve(false); }
      const ct = res.headers['content-type'] || '';
      if (!ct.startsWith('image/') && !ct.includes('svg') && !ct.includes('octet-stream')) {
        res.resume(); return resolve(false);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        try {
          resolve(fs.existsSync(dest) && fs.statSync(dest).size > 800);
          if (fs.existsSync(dest) && fs.statSync(dest).size <= 800) fs.unlinkSync(dest);
        } catch { resolve(false); }
      });
      file.on('error', () => { try { fs.unlinkSync(dest); } catch {} resolve(false); });
    } catch {
      try { if (fs.existsSync(dest)) fs.unlinkSync(dest); } catch {}
      resolve(false);
    }
  });
}

// ─── Strategy A: Wikipedia API images list → pick logo → Special:Redirect ──
async function tryWikiImages(slug, wikiTitle) {
  const dest = path.join(OUTPUT_DIR, `${slug}.png`);
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(wikiTitle)}&prop=images&format=json`;
  const json = await readJson(apiUrl);
  const images = json?.parse?.images;
  if (!images?.length) return false;

  // Prefer image with "logo" in name, else take first SVG/PNG
  const scored = images.map(img => {
    const lower = img.toLowerCase();
    let score = 0;
    if (lower.includes('logo')) score += 10;
    if (lower.endsWith('.svg')) score += 5;
    if (lower.endsWith('.png')) score += 3;
    if (lower.includes(slug.replace('-', ''))) score += 2;
    return { img, score };
  }).sort((a, b) => b.score - a.score);

  for (const { img } of scored.slice(0, 4)) {
    // Use en.wikipedia.org Special:Redirect instead of commons (avoids block)
    const redirectUrl = `https://en.wikipedia.org/wiki/Special:Redirect/file/${encodeURIComponent(img)}?width=300`;
    if (await downloadToFile(redirectUrl, dest)) return true;
    await sleep(300);
  }
  return false;
}

// ─── Strategy B: Wikipedia page thumbnail API (original approach) ────────────
async function tryWikiThumb(slug, wikiTitle) {
  const dest = path.join(OUTPUT_DIR, `${slug}.png`);
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=400`;
  const json = await readJson(apiUrl);
  const pages = json?.query?.pages;
  if (!pages) return false;
  const thumb = Object.values(pages)[0]?.thumbnail?.source;
  if (!thumb) return false;
  return await downloadToFile(thumb, dest);
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function processCompany(company) {
  const dest = path.join(OUTPUT_DIR, `${company.slug}.png`);

  if (fs.existsSync(dest) && fs.statSync(dest).size > 800) {
    console.log(`  ✓ ${company.slug.padEnd(22)} (cached)`);
    return 'cached';
  }

  if (!company.wiki) {
    console.log(`  - ${company.slug.padEnd(22)} no wiki page`);
    return 'no_wiki';
  }

  // Strategy A: images list + Special:Redirect
  if (await tryWikiImages(company.slug, company.wiki)) {
    console.log(`  ✓ ${company.slug.padEnd(22)} Wiki/Images`);
    return 'images';
  }

  await sleep(500);

  // Strategy B: page thumbnail
  if (await tryWikiThumb(company.slug, company.wiki)) {
    console.log(`  ✓ ${company.slug.padEnd(22)} Wiki/Thumb`);
    return 'thumb';
  }

  console.log(`  ✗ ${company.slug.padEnd(22)} FAILED`);
  return 'failed';
}

async function main() {
  console.log('\n📦 Pharma Logo Downloader v3\n');
  const tally = { cached: 0, images: 0, thumb: 0, no_wiki: 0, failed: 0 };

  for (const co of companies) {
    const r = await processCompany(co);
    tally[r] = (tally[r] || 0) + 1;
    await sleep(600);
  }

  const got = tally.cached + tally.images + tally.thumb;
  const total = companies.length;
  console.log(`\n✅ Done! ${got}/${total} logos ready.`);
  console.log(`   Images: ${tally.images}  Thumb: ${tally.thumb}  Cached: ${tally.cached}  No-Wiki: ${tally.no_wiki}  Failed: ${tally.failed}`);
  console.log(`   → ${OUTPUT_DIR}\n`);
}

main().catch(console.error);
