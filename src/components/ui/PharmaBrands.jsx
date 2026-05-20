import { motion } from 'framer-motion';
import { useState } from 'react';

// WhatsApp number for Nandi Chemist
const WHATSAPP_NUMBER = '918586850840';

const companies = [
  { name: 'Sun Pharma',       domain: 'sunpharma.com' },
  { name: 'Cipla',            domain: 'cipla.com' },
  { name: "Dr. Reddy's",      domain: 'drreddys.com' },
  { name: 'Zydus',            domain: 'zyduscadila.com' },
  { name: 'Lupin',            domain: 'lupin.com' },
  { name: 'Abbott India',     domain: 'abbott.com' },
  { name: 'Pfizer',           domain: 'pfizer.com' },
  { name: 'GSK',              domain: 'gsk.com' },
  { name: 'Novartis',         domain: 'novartis.com' },
  { name: 'Sanofi',           domain: 'sanofi.com' },
  { name: 'Mankind',          domain: 'mankindpharma.com' },
  { name: 'Torrent',          domain: 'torrentpharma.com' },
  { name: 'Alkem',            domain: 'alkemlabs.com' },
  { name: 'Intas',            domain: 'intaspharma.com' },
  { name: 'Glenmark',         domain: 'glenmarkpharma.com' },
  { name: 'Emcure',           domain: 'emcure.com' },
  { name: 'Wockhardt',        domain: 'wockhardt.com' },
  { name: 'Ajanta',           domain: 'ajantapharma.com' },
  { name: 'J.B. Chemicals',   domain: 'jbcppl.com' },
  { name: 'Micro Labs',       domain: 'microlabslimited.com' },
  { name: 'Himalaya',         domain: 'himalayawellness.com' },
  { name: 'Dabur',            domain: 'dabur.com' },
  { name: 'Bayer India',      domain: 'bayer.com' },
  { name: 'J&J',              domain: 'jnj.com' },
  { name: 'Reckitt',          domain: 'reckitt.com' },
  { name: 'Merck',            domain: 'merck.com' },
  { name: 'AstraZeneca',      domain: 'astrazeneca.com' },
  { name: 'Boehringer',       domain: 'boehringer-ingelheim.com' },
  { name: 'Roche India',      domain: 'roche.com' },
  { name: 'Biocon',           domain: 'biocon.com' },
  { name: 'IPCA Labs',        domain: 'ipca.com' },
  { name: 'Granules India',   domain: 'granulesindia.com' },
  { name: "Divi's Labs",      domain: 'divislabs.com' },
  { name: 'Strides Pharma',   domain: 'strides.com' },
  { name: 'Aristo Pharma',    domain: 'aristopharma.com' },
  { name: 'FDC Limited',      domain: 'fdclimited.com' },
  { name: 'Cadila',           domain: 'cadilapharma.in' },
  { name: 'P&G Health',       domain: 'pg.com' },
  { name: 'USV Pvt Ltd',      domain: 'usvpvtltd.com' },
  { name: 'Centaur Pharma',   domain: 'centaurpharma.com' },
  { name: 'Eris Lifesciences',domain: 'erislifesciences.com' },
  { name: 'Systopic Labs',    domain: 'systopic.com' },
  { name: 'Elder Pharma',     domain: 'elderpharma.com' },
  { name: 'Shreya Life',      domain: 'shreyalife.com' },
  { name: 'Indoco Remedies',  domain: 'indoco.com' },
  { name: 'Natco Pharma',     domain: 'natcopharma.com' },
  { name: 'Agio Pharma',      domain: 'agio.in' },
  { name: 'Aarti Drugs',      domain: 'aartidrugs.co.in' },
];

// Logo sources in priority order:
// 1. Clearbit Logo API (high quality, no token needed)
// 2. Google Favicon (reliable fallback)
const getLogoSources = (domain) => [
  `https://logo.clearbit.com/${domain}`,
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
];

const getWhatsAppLink = (brandName) => {
  const msg = encodeURIComponent(
    `Namaste! 🙏 Mujhe ${brandName} ki medicines chahiye. Kya aap help kar sakte hain?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
};

// Logo card with multi-source fallback
const BrandCard = ({ company, index }) => {
  const sources = getLogoSources(company.domain);
  const [srcIndex, setSrcIndex] = useState(0);

  const handleError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(srcIndex + 1);
    } else {
      setSrcIndex(sources.length); // trigger initial fallback
    }
  };

  const showFallback = srcIndex >= sources.length;

  return (
    <motion.a
      href={getWhatsAppLink(company.name)}
      target="_blank"
      rel="noopener noreferrer"
      key={index}
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
      {/* Subtle green glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0
                      group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      {/* Logo or Fallback */}
      <div className="relative z-10 w-12 h-12 flex items-center justify-center">
        {!showFallback ? (
          <img
            src={sources[srcIndex]}
            alt={company.name}
            onError={handleError}
            className="w-10 h-10 object-contain rounded"
            loading="lazy"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md"
            style={{
              background: 'linear-gradient(135deg, #e87019, #00477b)',
            }}
          >
            {company.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Brand Name */}
      <span className="relative z-10 text-xs font-semibold text-gray-600 group-hover:text-green-700
                       text-center whitespace-nowrap transition-colors duration-300 leading-tight">
        {company.name}
      </span>

      {/* WhatsApp icon badge on hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
                   -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463
                   -2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606
                   .134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371
                   -.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51
                   -.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016
                   -1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487
                   .709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758
                   -.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.534 5.857L.054 23.223
                   a.75.75 0 00.923.923l5.366-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373
                   12-12S18.627 0 12 0zm0 21.75a9.75 9.75 0 01-5.024-1.392l-.36-.214-3.733
                   1.03 1.03-3.733-.214-.36A9.75 9.75 0 1112 21.75z"/>
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
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.534 5.857L.054 23.223a.75.75 0 00.923.923l5.366-1.48A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.75 9.75 0 01-5.024-1.392l-.36-.214-3.733 1.03 1.03-3.733-.214-.36A9.75 9.75 0 1112 21.75z"/>
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
