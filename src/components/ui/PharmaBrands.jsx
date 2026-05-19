import { motion } from 'framer-motion';

const companies = [
  { name: 'Sun Pharma', color: '#e87019' },
  { name: 'Cipla', color: '#00477b' },
  { name: "Dr. Reddy's", color: '#e87019' },
  { name: 'Zydus', color: '#00477b' },
  { name: 'Lupin', color: '#e87019' },
  { name: 'Abbott India', color: '#00477b' },
  { name: 'Pfizer', color: '#e87019' },
  { name: 'GSK', color: '#00477b' },
  { name: 'Novartis', color: '#e87019' },
  { name: 'Sanofi', color: '#00477b' },
  { name: 'Mankind', color: '#e87019' },
  { name: 'Torrent', color: '#00477b' },
  { name: 'Alkem', color: '#e87019' },
  { name: 'Intas', color: '#00477b' },
  { name: 'Glenmark', color: '#e87019' },
  { name: 'Emcure', color: '#00477b' },
  { name: 'Wockhardt', color: '#e87019' },
  { name: 'Ajanta', color: '#00477b' },
  { name: 'J.B. Chemicals', color: '#e87019' },
  { name: 'Micro Labs', color: '#00477b' },
  { name: 'Himalaya', color: '#e87019' },
  { name: 'Dabur', color: '#00477b' },
  { name: 'Bayer India', color: '#e87019' },
  { name: 'Johnson & Johnson', color: '#00477b' },
  { name: 'Reckitt', color: '#e87019' },
  { name: 'Merck', color: '#00477b' },
  { name: 'AstraZeneca', color: '#e87019' },
  { name: 'Boehringer', color: '#00477b' },
  { name: 'Roche India', color: '#e87019' },
  { name: 'Biocon', color: '#00477b' },
  { name: 'IPCA Labs', color: '#e87019' },
  { name: 'Granules India', color: '#00477b' },
  { name: 'Divi\'s Labs', color: '#e87019' },
  { name: 'Strides Pharma', color: '#00477b' },
  { name: 'Aristo Pharma', color: '#e87019' },
  { name: 'FDC Limited', color: '#00477b' },
  { name: 'Cadila', color: '#e87019' },
  { name: 'P&G Health', color: '#00477b' },
  { name: 'USV Pvt Ltd', color: '#e87019' },
  { name: 'Centaur Pharma', color: '#00477b' },
  { name: 'Eris Lifesciences', color: '#e87019' },
  { name: 'Systopic Labs', color: '#00477b' },
  { name: 'Elder Pharma', color: '#e87019' },
  { name: 'Shreya Life', color: '#00477b' },
  { name: 'Indoco Remedies', color: '#e87019' },
  { name: 'Natco Pharma', color: '#00477b' },
  { name: 'Agio Pharma', color: '#e87019' },
  { name: 'Aarti Drugs', color: '#00477b' },
];

const PharmaBrands = () => (
  <section className="py-16 bg-white">
    <div className="container-max px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">Our Partners</span>
        <h2 className="text-3xl md:text-4xl font-outfit font-bold text-gray-800 mt-2 mb-3">
          Medicines from <span className="text-primary-600">Trusted Companies</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm">
          We stock medicines sourced directly from {companies.length}+ certified pharmaceutical manufacturers — 100% genuine, every time.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3 justify-center">
        {companies.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02 }}
            whileHover={{ scale: 1.06, y: -2 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 shadow-sm hover:shadow-md transition-all cursor-default"
          >
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: c.color }}
            />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{c.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs text-gray-400 mt-10"
      >
        ✅ All medicines sourced directly from certified distributors & manufacturers
      </motion.p>
    </div>
  </section>
);

export default PharmaBrands;
