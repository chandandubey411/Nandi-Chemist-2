const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const brands = [
  { slug: 'sun-pharma',   name: 'Sun\nPharma',    abbr: 'SP',  bg: '#e87019', fg: '#ffffff', style: 'text' },
  { slug: 'cipla',        name: 'Cipla',           abbr: 'CI',  bg: '#005baa', fg: '#ffffff', style: 'wordmark' },
  { slug: 'dr-reddys',    name: "Dr.\nReddy's",    abbr: 'DR',  bg: '#c8102e', fg: '#ffffff', style: 'text' },
  { slug: 'zydus',        name: 'Zydus',           abbr: 'ZY',  bg: '#00529b', fg: '#ffffff', style: 'wordmark' },
  { slug: 'lupin',        name: 'Lupin',           abbr: 'LU',  bg: '#007a33', fg: '#ffffff', style: 'wordmark' },
  { slug: 'abbott',       name: 'Abbott\nIndia',   abbr: 'AI',  bg: '#003087', fg: '#ffffff', style: 'text' },
  { slug: 'pfizer',       name: 'Pfizer',          abbr: 'PF',  bg: '#0093d0', fg: '#ffffff', style: 'wordmark' },
  { slug: 'gsk',          name: 'GSK',             abbr: 'GK',  bg: '#f36c21', fg: '#ffffff', style: 'wordmark' },
  { slug: 'novartis',     name: 'Novartis',        abbr: 'NV',  bg: '#eb3c96', fg: '#ffffff', style: 'wordmark' },
  { slug: 'sanofi',       name: 'Sanofi',          abbr: 'SN',  bg: '#6d2b8f', fg: '#ffffff', style: 'wordmark' },
  { slug: 'mankind',      name: 'Mankind',         abbr: 'MK',  bg: '#0052a5', fg: '#ffffff', style: 'wordmark' },
  { slug: 'torrent',      name: 'Torrent',         abbr: 'TR',  bg: '#c8102e', fg: '#ffffff', style: 'wordmark' },
  { slug: 'alkem',        name: 'Alkem',           abbr: 'AL',  bg: '#00539f', fg: '#ffffff', style: 'wordmark' },
  { slug: 'intas',        name: 'Intas',           abbr: 'IN',  bg: '#003f87', fg: '#ffffff', style: 'wordmark' },
  { slug: 'glenmark',     name: 'Glen\nmark',      abbr: 'GL',  bg: '#c8102e', fg: '#ffffff', style: 'text' },
  { slug: 'emcure',       name: 'Emcure',          abbr: 'EM',  bg: '#e31837', fg: '#ffffff', style: 'wordmark' },
  { slug: 'wockhardt',    name: 'Wock\nhardt',     abbr: 'WK',  bg: '#00539f', fg: '#ffffff', style: 'text' },
  { slug: 'ajanta',       name: 'Ajanta',          abbr: 'AJ',  bg: '#003087', fg: '#ffffff', style: 'wordmark' },
  { slug: 'jb-chemicals', name: 'JB\nChem',        abbr: 'JB',  bg: '#003366', fg: '#ffffff', style: 'text' },
  { slug: 'micro-labs',   name: 'Micro\nLabs',     abbr: 'ML',  bg: '#005eb8', fg: '#ffffff', style: 'text' },
  { slug: 'himalaya',     name: 'Himalaya',        abbr: 'HI',  bg: '#2e7d32', fg: '#ffffff', style: 'leaf' },
  { slug: 'dabur',        name: 'Dabur',           abbr: 'DA',  bg: '#388e3c', fg: '#ffffff', style: 'wordmark' },
  { slug: 'bayer',        name: 'Bayer',           abbr: 'BY',  bg: '#10384f', fg: '#ffffff', style: 'circle' },
  { slug: 'jnj',          name: 'J&J',             abbr: 'JJ',  bg: '#c8102e', fg: '#ffffff', style: 'wordmark' },
  { slug: 'reckitt',      name: 'Reckitt',         abbr: 'RE',  bg: '#cc0000', fg: '#ffffff', style: 'wordmark' },
  { slug: 'merck',        name: 'Merck',           abbr: 'MR',  bg: '#009999', fg: '#ffffff', style: 'wordmark' },
  { slug: 'astrazeneca',  name: 'Astra\nZeneca',   abbr: 'AZ',  bg: '#830051', fg: '#ffffff', style: 'text' },
  { slug: 'boehringer',   name: 'Boeh\nringer',    abbr: 'BI',  bg: '#003082', fg: '#ffffff', style: 'text' },
  { slug: 'roche',        name: 'Roche',           abbr: 'RO',  bg: '#0066cc', fg: '#ffffff', style: 'wordmark' },
  { slug: 'biocon',       name: 'Biocon',          abbr: 'BC',  bg: '#00b0f0', fg: '#ffffff', style: 'wordmark' },
  { slug: 'ipca',         name: 'IPCA\nLabs',      abbr: 'IL',  bg: '#004b87', fg: '#ffffff', style: 'text' },
  { slug: 'granules',     name: 'Granules\nIndia', abbr: 'GI',  bg: '#e31837', fg: '#ffffff', style: 'text' },
  { slug: 'divis',        name: "Divi's\nLabs",    abbr: 'DL',  bg: '#c8102e', fg: '#ffffff', style: 'text' },
  { slug: 'strides',      name: 'Strides',         abbr: 'ST',  bg: '#005eb8', fg: '#ffffff', style: 'wordmark' },
  { slug: 'aristo',       name: 'Aristo',          abbr: 'AP',  bg: '#003087', fg: '#ffffff', style: 'wordmark' },
  { slug: 'fdc',          name: 'FDC\nLimited',    abbr: 'FL',  bg: '#c8102e', fg: '#ffffff', style: 'text' },
  { slug: 'cadila',       name: 'Cadila',          abbr: 'CA',  bg: '#00539f', fg: '#ffffff', style: 'wordmark' },
  { slug: 'pg',           name: 'P&G\nHealth',     abbr: 'PG',  bg: '#003087', fg: '#ffffff', style: 'text' },
  { slug: 'usv',          name: 'USV\nPvt Ltd',    abbr: 'UP',  bg: '#004b87', fg: '#ffffff', style: 'text' },
  { slug: 'centaur',      name: 'Centaur\nPharma', abbr: 'CP',  bg: '#003366', fg: '#ffffff', style: 'text' },
  { slug: 'eris',         name: 'Eris',            abbr: 'EL',  bg: '#6d2b8f', fg: '#ffffff', style: 'wordmark' },
  { slug: 'systopic',     name: 'Systopic\nLabs',  abbr: 'SL',  bg: '#7b2d8b', fg: '#ffffff', style: 'text' },
  { slug: 'elder',        name: 'Elder\nPharma',   abbr: 'EP',  bg: '#003087', fg: '#ffffff', style: 'text' },
  { slug: 'shreya',       name: 'Shreya\nLife',    abbr: 'SL',  bg: '#005eb8', fg: '#ffffff', style: 'text' },
  { slug: 'indoco',       name: 'Indoco',          abbr: 'IR',  bg: '#003087', fg: '#ffffff', style: 'wordmark' },
  { slug: 'natco',        name: 'Natco\nPharma',   abbr: 'NP',  bg: '#e31837', fg: '#ffffff', style: 'text' },
  { slug: 'agio',         name: 'Agio\nPharma',    abbr: 'AP',  bg: '#003366', fg: '#ffffff', style: 'text' },
  { slug: 'aarti-drugs',  name: 'Aarti\nDrugs',    abbr: 'AD',  bg: '#004b87', fg: '#ffffff', style: 'text' },
];

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return {r,g,b};
}

function lighten(hex, amount=40) {
  const {r,g,b} = hexToRgb(hex);
  const lr = Math.min(255, r+amount);
  const lg = Math.min(255, g+amount);
  const lb = Math.min(255, b+amount);
  return `rgb(${lr},${lg},${lb})`;
}

function makeWordmarkSVG(brand) {
  const name = brand.name.replace('\n', ' ');
  const light = lighten(brand.bg, 35);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${brand.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${light};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="24" fill="url(#bg)"/>
  <text x="60" y="68" font-family="Arial,Helvetica,sans-serif" font-size="28" font-weight="900"
        text-anchor="middle" fill="${brand.fg}" letter-spacing="-1">${name}</text>
</svg>`;
}

function makeTextSVG(brand) {
  const lines = brand.name.split('\n');
  const light = lighten(brand.bg, 35);
  const y1 = lines.length === 1 ? 68 : 52;
  const y2 = 74;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${brand.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${light};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="24" fill="url(#bg)"/>
  <text x="60" y="${y1}" font-family="Arial,Helvetica,sans-serif" font-size="${lines[0].length > 6 ? 20 : 24}" font-weight="900"
        text-anchor="middle" fill="${brand.fg}">${lines[0]}</text>
  ${lines[1] ? `<text x="60" y="${y2}" font-family="Arial,Helvetica,sans-serif" font-size="${lines[1].length > 6 ? 20 : 24}" font-weight="900"
        text-anchor="middle" fill="${brand.fg}" opacity="0.9">${lines[1]}</text>` : ''}
</svg>`;
}

function makeCircleSVG(brand) {
  const light = lighten(brand.bg, 40);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${brand.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${light};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="24" fill="url(#bg)"/>
  <circle cx="60" cy="52" r="26" fill="none" stroke="${brand.fg}" stroke-width="5" opacity="0.9"/>
  <line x1="60" y1="26" x2="60" y2="78" stroke="${brand.fg}" stroke-width="4.5" opacity="0.9"/>
  <line x1="34" y1="52" x2="86" y2="52" stroke="${brand.fg}" stroke-width="4.5" opacity="0.9"/>
  <text x="60" y="104" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="700"
        text-anchor="middle" fill="${brand.fg}" opacity="0.9">${brand.name}</text>
</svg>`;
}

function makeLeafSVG(brand) {
  const light = lighten(brand.bg, 40);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${brand.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${light};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="24" fill="url(#bg)"/>
  <path d="M60 22 C78 30, 88 50, 72 68 C60 80, 44 72, 40 58 C36 44, 42 28, 60 22 Z"
        fill="${brand.fg}" opacity="0.9"/>
  <line x1="60" y1="68" x2="60" y2="88" stroke="${brand.fg}" stroke-width="3" opacity="0.7"/>
  <text x="60" y="108" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="700"
        text-anchor="middle" fill="${brand.fg}" opacity="0.9">${brand.name}</text>
</svg>`;
}

let count = 0;
for (const brand of brands) {
  const svgPath = path.join(outDir, `${brand.slug}.svg`);
  
  let svg;
  if (brand.style === 'circle') {
    svg = makeCircleSVG(brand);
  } else if (brand.style === 'leaf') {
    svg = makeLeafSVG(brand);
  } else if (brand.style === 'wordmark') {
    svg = makeWordmarkSVG(brand);
  } else {
    svg = makeTextSVG(brand);
  }

  fs.writeFileSync(svgPath, svg, 'utf8');
  console.log(`  Created: ${brand.slug}.svg`);
  count++;
}

console.log(`\n✅ Done! ${count} SVG logos created in public/logos/`);
