import { motion } from 'framer-motion';
import { useState } from 'react';

const WHATSAPP_NUMBER = '918586850840';

// slug must match the filename in public/logos/{slug}.png
const companies = [
  { name: 'Sun Pharma', slug: 'sun-pharma', color: '#e87019', logo: 'https://logo.clearbit.com/sunpharma.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Sun_Pharmaceutical_logo.svg/300px-Sun_Pharmaceutical_logo.svg.png' },
  { name: 'Cipla', slug: 'cipla', color: '#005baa', logo: 'https://logo.clearbit.com/cipla.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Cipla_logo.svg/300px-Cipla_logo.svg.png' },
  { name: "Dr. Reddy's", slug: 'dr-reddys', color: '#c8102e', logo: 'https://logo.clearbit.com/drreddys.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Dr._Reddy%27s_Laboratories_logo.svg/300px-Dr._Reddy%27s_Laboratories_logo.svg.png' },
  { name: 'Zydus', slug: 'zydus', color: '#00529b', logo: 'https://logo.clearbit.com/zyduslife.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zydus_Lifesciences_logo.svg/300px-Zydus_Lifesciences_logo.svg.png' },
  { name: 'Lupin', slug: 'lupin', color: '#007a33', logo: 'https://logo.clearbit.com/lupin.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Lupin_Limited_logo.svg/300px-Lupin_Limited_logo.svg.png' },
  { name: 'Abbott India', slug: 'abbott', color: '#003087', logo: 'https://logo.clearbit.com/abbott.in', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Abbott_Laboratories_logo.svg/300px-Abbott_Laboratories_logo.svg.png' },
  { name: 'Pfizer', slug: 'pfizer', color: '#0093d0', logo: 'https://logo.clearbit.com/pfizer.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Pfizer_%282021%29.svg/300px-Pfizer_%282021%29.svg.png' },
  { name: 'GSK', slug: 'gsk', color: '#f36c21', logo: 'https://logo.clearbit.com/gsk.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/GSK_logo_2022.svg/300px-GSK_logo_2022.svg.png' },
  { name: 'Novartis', slug: 'novartis', color: '#eb3c96', logo: '/logos/novartis.svg', fallback: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Novartis-Logo.svg' },
  { name: 'Sanofi', slug: 'sanofi', color: '#6d2b8f', logo: 'https://logo.clearbit.com/sanofi.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Sanofi_logo.svg/300px-Sanofi_logo.svg.png' },
  { name: 'Mankind', slug: 'mankind', color: '#0052a5', logo: 'https://logo.clearbit.com/mankindpharma.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Mankind_Pharma_Logo.svg/300px-Mankind_Pharma_Logo.svg.png' },
  { name: 'Torrent', slug: 'torrent', color: '#c8102e', logo: 'https://logo.clearbit.com/torrentpharma.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Torrent_Pharmaceuticals_logo.svg/300px-Torrent_Pharmaceuticals_logo.svg.png' },
  { name: 'Alkem', slug: 'alkem', color: '#00539f', logo: 'https://logo.clearbit.com/alkemlabs.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/Alkem_Laboratories_Logo.svg/300px-Alkem_Laboratories_Logo.svg.png' },
  { name: 'Intas', slug: 'intas', color: '#003f87', logo: 'https://logo.clearbit.com/intaspharma.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Intas_Pharmaceuticals.svg/300px-Intas_Pharmaceuticals.svg.png' },
  { name: 'Glenmark', slug: 'glenmark', color: '#c8102e', logo: 'https://logo.clearbit.com/glenmarkpharma.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Glenmark_Pharmaceuticals_logo.svg/300px-Glenmark_Pharmaceuticals_logo.svg.png' },
  { name: 'Emcure', slug: 'emcure', color: '#e31837', logo: 'https://logo.clearbit.com/emcure.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Emcure_Pharmaceuticals_logo.svg/300px-Emcure_Pharmaceuticals_logo.svg.png' },
  { name: 'Wockhardt', slug: 'wockhardt', color: '#00539f', logo: 'https://logo.clearbit.com/wockhardt.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Wockhardt_logo.svg/300px-Wockhardt_logo.svg.png' },
  { name: 'Ajanta', slug: 'ajanta', color: '#003087', logo: 'https://logo.clearbit.com/ajantapharma.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Ajanta_Pharma_logo.png/300px-Ajanta_Pharma_logo.png' },
  { name: 'J.B. Chemicals', slug: 'jb-chemicals', color: '#003366', logo: 'https://logo.clearbit.com/jbcpl.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/JB_Chemicals_%26_Pharmaceuticals_Logo.png/300px-JB_Chemicals_%26_Pharmaceuticals_Logo.png' },
  { name: 'Micro Labs', slug: 'micro-labs', color: '#005eb8', logo: '/logos/micro-labs.png', fallback: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/MicroLabsLimited_LOGO.png' },
  { name: 'Himalaya', slug: 'himalaya', color: '#4caf50', logo: 'https://logo.clearbit.com/himalayawellness.in', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Himalaya_Drug_Company_Logo.svg/300px-Himalaya_Drug_Company_Logo.svg.png' },
  { name: 'Dabur', slug: 'dabur', color: '#4caf50', logo: 'https://logo.clearbit.com/dabur.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Dabur_India_logo.svg/300px-Dabur_India_logo.svg.png' },
  { name: 'Bayer India', slug: 'bayer', color: '#10384f', logo: 'https://logo.clearbit.com/bayer.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Bayer_AG_logo.svg/300px-Bayer_AG_logo.svg.png' },
  { name: 'J&J', slug: 'jnj', color: '#c8102e', logo: 'https://logo.clearbit.com/jnj.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Johnson_%26_Johnson_logo.svg/300px-Johnson_%26_Johnson_logo.svg.png' },
  { name: "Johnson's Baby", slug: 'johnsons-baby', color: '#f3a3b2', logo: '/logos/Johnsons-Baby-Logo.jpg', fallback: 'https://logo.clearbit.com/johnsonsbaby.com' },
  { name: 'Nestlé', slug: 'nestle', color: '#1f579c', logo: '/logos/nestle_india_logo.jpg', fallback: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Nestl%C3%A9_textlogo.svg' },
  { name: 'Reckitt', slug: 'reckitt', color: '#cc0000', logo: 'https://logo.clearbit.com/reckitt.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Reckitt_logo.svg/300px-Reckitt_logo.svg.png' },
  { name: 'Merck', slug: 'merck', color: '#009999', logo: 'https://logo.clearbit.com/merck.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Merck_%26_Co.svg/300px-Merck_%26_Co.svg.png' },
  { name: 'AstraZeneca', slug: 'astrazeneca', color: '#830051', logo: 'https://logo.clearbit.com/astrazeneca.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/AstraZeneca_logo.svg/300px-AstraZeneca_logo.svg.png' },
  { name: 'Boehringer', slug: 'boehringer', color: '#003082', logo: 'https://logo.clearbit.com/boehringer-ingelheim.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Boehringer_Ingelheim_Logo.svg/300px-Boehringer_Ingelheim_Logo.svg.png' },
  { name: 'Roche India', slug: 'roche', color: '#0066cc', logo: 'https://logo.clearbit.com/roche.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Hoffmann-La_Roche_logo.svg/300px-Hoffmann-La_Roche_logo.svg.png' },
  { name: 'Biocon', slug: 'biocon', color: '#00b0f0', logo: 'https://logo.clearbit.com/biocon.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Biocon_logo.svg/300px-Biocon_logo.svg.png' },
  { name: 'IPCA Labs', slug: 'ipca', color: '#004b87', logo: 'https://logo.clearbit.com/ipcalabs.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/86/IPCA_Laboratories_logo.svg/300px-IPCA_Laboratories_logo.svg.png' },
  { name: 'Granules India', slug: 'granules', color: '#e31837', logo: 'https://logo.clearbit.com/granulesindia.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/g/ga/Granules_India_logo.png/300px-Granules_India_logo.png' },
  { name: "Divi's Labs", slug: 'divis', color: '#c8102e', logo: 'https://logo.clearbit.com/divislabs.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Divi%27s_Laboratories_logo.svg/300px-Divi%27s_Laboratories_logo.svg.png' },
  { name: 'Strides Pharma', slug: 'strides', color: '#005eb8', logo: 'https://logo.clearbit.com/stridespharma.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Strides_Pharma_Science_logo.svg/300px-Strides_Pharma_Science_logo.svg.png' },
  { name: 'Aristo Pharma', slug: 'aristo', color: '#003087', logo: 'https://logo.clearbit.com/aristopharma.org', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Aristo_Pharmaceuticals_logo.svg/300px-Aristo_Pharmaceuticals_logo.svg.png' },
  { name: 'FDC Limited', slug: 'fdc', color: '#c8102e', logo: 'https://logo.clearbit.com/fdclimited.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/FDC_Limited_Logo.png/300px-FDC_Limited_Logo.png' },
  { name: 'Cadila', slug: 'cadila', color: '#00539f', logo: '/logos/cadila.svg', fallback: 'https://upload.wikimedia.org/wikipedia/en/9/93/Cadila_Pharmaceuticals.svg' },
  { name: 'P&G Health', slug: 'pg', color: '#003087', logo: 'https://logo.clearbit.com/pg.com', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Procter_%26_Gamble_logo_2013.svg/300px-Procter_%26_Gamble_logo_2013.svg.png' },
  { name: 'USV Pvt Ltd', slug: 'usv', color: '#004b87', logo: 'https://logo.clearbit.com/usvpvtltd.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/u/us/USV_Limited_logo.png/300px-USV_Limited_logo.png' },
  { name: 'Centaur Pharma', slug: 'centaur', color: '#003366', logo: 'https://logo.clearbit.com/centaurpharma.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Centaur_Pharmaceuticals_logo.svg/300px-Centaur_Pharmaceuticals_logo.svg.png' },
  { name: 'Eris Lifesciences', slug: 'eris', color: '#6d2b8f', logo: 'https://logo.clearbit.com/erislifesciences.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Eris_Lifesciences_logo.png/300px-Eris_Lifesciences_logo.png' },
  { name: 'Systopic Labs', slug: 'systopic', color: '#7b2d8b', logo: '/logos/systopic.png', fallback: 'http://www.systopic.com/images/logo.png' },
  { name: 'Elder Pharma', slug: 'elder', color: '#003087', logo: 'https://logo.clearbit.com/elderpharma.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Elder_Pharmaceuticals_logo.svg/300px-Elder_Pharmaceuticals_logo.svg.png' },
  { name: 'Shreya Life', slug: 'shreya', color: '#005eb8', logo: 'https://logo.clearbit.com/shreyalife.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Shreya_Life_Sciences_logo.svg/300px-Shreya_Life_Sciences_logo.svg.png' },
  { name: 'Indoco Remedies', slug: 'indoco', color: '#003087', logo: 'https://logo.clearbit.com/indoco.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/i/in/Indoco_Remedies_logo.png/300px-Indoco_Remedies_logo.png' },
  { name: 'Natco Pharma', slug: 'natco', color: '#e31837', logo: 'https://logo.clearbit.com/natcopharma.com', fallback: 'https://upload.wikimedia.org/wikipedia/en/thumb/n/na/NATCO_Pharma_logo.png/300px-NATCO_Pharma_logo.png' },
  { name: 'Agio Pharma', slug: 'agio', color: '#003366', logo: '/logos/agio.png', fallback: 'http://www.agio-pharma.com/wp-content/uploads/2019/10/logo-agio.png' },
  { name: 'Aarti Drugs', slug: 'aarti-drugs', color: '#004b87', logo: '/logos/aarti-drugs.png', fallback: 'https://www.aartidrugs.com/assets/images/aarti-Logo.png' }
];

const getWhatsAppLink = (brandName) => {
  const msg = encodeURIComponent(
    `Namaste! 🙏 Mujhe ${brandName} ki medicines chahiye. Kya aap help kar sakte hain?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
};

const BADGE_GRADIENTS = [
  ['#e87019', '#c8102e'],
  ['#003087', '#00539f'],
  ['#007a33', '#4caf50'],
  ['#6d2b8f', '#c8102e'],
  ['#00539f', '#003366'],
  ['#c8102e', '#e87019'],
];

const BrandCard = ({ company, index }) => {
  // Try online Clearbit, then Wikimedia fallback, then local PNG, then local SVG, then initials badge
  const sources = [
    company.logo,
    company.fallback,
    `/logos/${company.slug}.png`,
    `/logos/${company.slug}.svg`,
    `/logos/${company.slug}.jpg`,
    `/logos/${company.slug}.jpeg`
  ].filter(Boolean);

  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(prev => prev + 1);
    } else {
      setFailed(true);
    }
  };

  const currentSrc = failed ? null : sources[srcIndex];

  const initials = company.name
    .split(/[\s.&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const [g1, g2] = BADGE_GRADIENTS[index % BADGE_GRADIENTS.length];

  return (
    <motion.a
      href={getWhatsAppLink(company.name)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.018, duration: 0.35, ease: 'easeOut' }}
      whileHover={{ scale: 1.07, y: -4 }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex flex-col items-center justify-center gap-2 px-5 py-4 rounded-2xl
                 border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:border-green-200
                 transition-all duration-300 cursor-pointer min-w-[110px] overflow-hidden"
      title={`Order ${company.name} medicines on WhatsApp`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0
                      group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      {/* Logo */}
      <div className="relative z-10 w-12 h-12 flex items-center justify-center">
        {!failed && currentSrc ? (
          <img
            src={currentSrc}
            alt={company.name}
            onError={handleError}
            className="w-11 h-11 object-contain rounded"
            loading="lazy"
          />
        ) : (
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md tracking-wide"
            style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Name */}
      <span className="relative z-10 text-xs font-semibold text-gray-600 group-hover:text-green-700
                       text-center whitespace-nowrap transition-colors duration-300 leading-tight">
        {company.name}
      </span>

      {/* WhatsApp badge on hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.534 5.857L.054 23.223a.75.75 0 00.923.923l5.366-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.75 9.75 0 01-5.024-1.392l-.36-.214-3.733 1.03 1.03-3.733-.214-.36A9.75 9.75 0 1112 21.75z" />
        </svg>
      </div>
    </motion.a>
  );
};

const PharmaBrands = () => (
  <section className="py-16 bg-gradient-to-b from-white to-gray-50">
    <div className="container-max px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Our Partners
        </span>
        <h2 className="text-3xl md:text-4xl font-outfit font-bold text-gray-800 mt-2 mb-3">
          Medicines from <span className="text-primary-600">Trusted Companies</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm">
          We stock medicines sourced directly from {companies.length}+ certified pharmaceutical
          manufacturers — 100% genuine, every time.
        </p>
        <p className="text-xs text-green-600 font-medium mt-2 flex items-center justify-center gap-1.5">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.534 5.857L.054 23.223a.75.75 0 00.923.923l5.366-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.75 9.75 0 01-5.024-1.392l-.36-.214-3.733 1.03 1.03-3.733-.214-.36A9.75 9.75 0 1112 21.75z" />
          </svg>
          Click on any brand card to order medicines — Place your order on WhatsApp!
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3 justify-center">
        {companies.map((company, i) => (
          <BrandCard key={i} company={company} index={i} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs text-gray-400 mt-10"
      >
        ✅ All medicines sourced directly from certified distributors &amp; manufacturers
      </motion.p>
    </div>
  </section>
);

export default PharmaBrands;
