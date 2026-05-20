const crypto = require('crypto');
const https = require('https');

const wikimediaFiles = {
  'sun-pharma': { type: 'en', file: 'Sun_Pharmaceutical_logo.svg' },
  'cipla': { type: 'commons', file: 'Cipla_logo.svg' },
  'dr-reddys': { type: 'en', file: "Dr._Reddy's_Laboratories_logo.svg" },
  'zydus': { type: 'commons', file: 'Zydus_Lifesciences_logo.svg' },
  'lupin': { type: 'en', file: 'Lupin_Limited_logo.svg' },
  'abbott': { type: 'commons', file: 'Abbott_Laboratories_logo.svg' },
  'pfizer': { type: 'commons', file: 'Pfizer_(2021).svg' },
  'gsk': { type: 'commons', file: 'GSK_logo_2022.svg' },
  'novartis': { type: 'commons', file: 'Novartis-Logo.svg' },
  'sanofi': { type: 'commons', file: 'Sanofi_logo.svg' },
  'mankind': { type: 'en', file: 'Mankind_Pharma_Corporate_Logo.png' },
  'torrent': { type: 'commons', file: 'Torrent_Pharmaceuticals_logo.svg' },
  'alkem': { type: 'commons', file: 'Alkem_Laboratories_Logo.svg' },
  'intas': { type: 'commons', file: 'Intas_Pharmaceuticals.svg' },
  'glenmark': { type: 'commons', file: 'Glenmark_Pharmaceuticals_logo.svg' },
  'emcure': { type: 'commons', file: 'Emcure_Pharmaceuticals_logo.svg' },
  'wockhardt': { type: 'commons', file: 'Wockhardt_logo.svg' },
  'ajanta': { type: 'commons', file: 'Ajanta_Pharma_logo.png' },
  'jb-chemicals': { type: 'en', file: 'JB_Chemicals_&_Pharmaceuticals_Logo.png' },
  'micro-labs': { type: 'en', file: 'Micro_Labs_logo.png' },
  'himalaya': { type: 'commons', file: 'Himalaya_Drug_Company_Logo.svg' },
  'dabur': { type: 'commons', file: 'Dabur_India_logo.svg' },
  'bayer': { type: 'commons', file: 'Bayer_AG_logo.svg' },
  'jnj': { type: 'commons', file: 'Johnson_&_Johnson_logo.svg' },
  'reckitt': { type: 'commons', file: 'Reckitt_logo.svg' },
  'merck': { type: 'commons', file: 'Merck_&_Co.svg' },
  'astrazeneca': { type: 'commons', file: 'AstraZeneca_logo.svg' },
  'boehringer': { type: 'commons', file: 'Boehringer_Ingelheim_Logo.svg' },
  'roche': { type: 'commons', file: 'Hoffmann-La_Roche_logo.svg' },
  'biocon': { type: 'commons', file: 'Biocon_logo.svg' },
  'ipca': { type: 'commons', file: 'IPCA_Laboratories_logo.svg' },
  'granules': { type: 'en', file: 'Granules_India_logo.png' },
  'divis': { type: 'commons', file: "Divi's_Laboratories_logo.svg" },
  'strides': { type: 'commons', file: 'Strides_Pharma_Science_logo.svg' },
  'aristo': { type: 'commons', file: 'Aristo_Pharmaceuticals_logo.svg' },
  'fdc': { type: 'en', file: 'FDC_Limited_Logo.png' },
  'cadila': { type: 'commons', file: 'Cadila_Pharmaceuticals.svg' },
  'pg': { type: 'commons', file: 'Procter_&_Gamble_logo_2013.svg' },
  'usv': { type: 'en', file: 'USV_Limited_logo.png' },
  'centaur': { type: 'commons', file: 'Centaur_Pharmaceuticals_logo.svg' },
  'eris': { type: 'en', file: 'Eris_Lifesciences_logo.png' },
  'systopic': { type: 'commons', file: 'Systopic_Laboratories_logo.svg' },
  'elder': { type: 'commons', file: 'Elder_Pharmaceuticals_logo.svg' },
  'shreya': { type: 'commons', file: 'Shreya_Life_Sciences_logo.svg' },
  'indoco': { type: 'en', file: 'Indoco_Remedies_logo.png' },
  'natco': { type: 'en', file: 'NATCO_Pharma_logo.png' },
  'agio': { type: 'commons', file: 'Agio_Pharmaceuticals_logo.svg' },
  'aarti-drugs': { type: 'en', file: 'Aarti_Drugs_logo.png' }
};

function getWikiUrl(type, file) {
  const normalized = file.replace(/ /g, '_');
  const hash = crypto.createHash('md5').update(normalized).digest('hex');
  const path = `${hash[0]}/${hash.slice(0, 2)}/${normalized}`;
  return `https://upload.wikimedia.org/wikipedia/${type}/${path}`;
}

function checkUrl(slug, url) {
  return new Promise((resolve) => {
    const options = {
      method: 'HEAD',
      family: 4,
      headers: {
        'User-Agent': 'NandiChemistLogoDownloader/1.0 (https://nandichemist.com; support@nandichemist.com)'
      }
    };
    const req = https.request(url, options, (res) => {
      resolve({ slug, url, statusCode: res.statusCode });
    });
    req.on('error', (err) => {
      resolve({ slug, url, statusCode: 500, error: err.message });
    });
    req.setTimeout(3000, () => {
      req.destroy();
      resolve({ slug, url, statusCode: 408 });
    });
    req.end();
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log('Testing URLs sequentially...');
  const entries = Object.entries(wikimediaFiles);
  for (const [slug, info] of entries) {
    const url = getWikiUrl(info.type, info.file);
    const r = await checkUrl(slug, url);
    if (r.statusCode !== 200) {
      console.log(`❌ ${r.slug}: status ${r.statusCode} for ${r.url}`);
    } else {
      console.log(`✅ ${r.slug}: OK`);
    }
    await sleep(400); // 400ms delay between requests
  }
}

run();
