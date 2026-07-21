import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiExternalLink } from 'react-icons/fi';

const outlets = [
  {
    name: "Sector-75 (Dasnac Jewel)",
    tag: "Main Branch",
    address: "Shop no 6, Ground Floor, Dasnac Jewel of Noida, Sector 75, Noida, UP 201316",
    image: "/locations/dasnac-sector-75.jpg",
    phone: "+91 8586850840",
    mapUrl: "https://maps.google.com/?q=Shop+no+6,+Ground+Floor,+Dasnac+Jewel+of+Noida,+Sector+75,+Noida,+UP+201316"
  },
  {
    name: "Sector-120 (Prateek Laurel)",
    tag: "Prateek Laurel Store",
    address: "Shop No. 11 & 20, Plot No. - GH-1, Prateek Laurel, Sector-120, Gautam Budh Nagar - Noida (U.P.), Pin Code - 201301",
    image: "/locations/prateek-laurel.jpg",
    phone: "0120-4566499, +91 8766256493, +91 9873017451",
    mapUrl: "https://maps.google.com/?q=Nandi+Chemists+Prateek+Laurel+Sector-120+Noida"
  },
  {
    name: "Sector-110 (Lotus Arcade)",
    tag: "Lotus Arcade Store",
    address: "Shop No. 12A, Lotus Arcade, Sector-110, Noida, Gautam Buddh Nagar (U.P.) - 201301",
    image: "/locations/lotus-arcade.jpg",
    phone: "+91 8595293455, +91 8595358138, +91 8287571774",
    mapUrl: "https://maps.google.com/?q=Nandi+Chemists+Lotus+Panache+Arcade+Sector-110+Noida"
  },
  {
    name: "Sector-137 (Gulshan Vivante)",
    tag: "Gulshan Vivante Store",
    address: "Shop No. 107, Gulshan Vivante, Sector-137, Gautam Budh Nagar - Noida (U.P.), Pin Code - 201301",
    image: "/locations/gulshan-vivante.jpg",
    phone: "0120-4994952, +91 9643563902, +91 9643563903",
    mapUrl: "https://maps.google.com/?q=Nandi+Chemists+Gulshan+Vivante+Sector-137+Noida"
  },
  {
    name: "Sector-30 (Kirtimaan Plaza)",
    tag: "Kirtimaan Plaza Store",
    address: "Shop No. 02, Plot No. E-16-B-02, First Floor, Kirtimaan Plaza, Sector-30, Noida (U.P.) - 201301",
    image: "/locations/kirtimaan-plaza.jpg",
    phone: "+91 9911570399",
    mapUrl: "https://maps.google.com/?q=Nandi+Chemists+Kirtimaan+Plaza+Sector-30+Noida"
  },
  {
    name: "Sector-93B (Grand Omaxe)",
    tag: "Grand Omaxe Store",
    address: "Shop No. 12, Omaxe Grand, Opp. Panchsheel Balak Inter College, Sector-93B, Noida, Gautam Buddh Nagar (U.P.) - 201304",
    image: "/locations/grand-omaxe.jpg",
    phone: "+91 9311766712, +91 9311766715",
    mapUrl: "https://maps.google.com/?q=Nandi+Chemists+Grand+Omaxe+Sector-93B+Noida"
  }
];

const Outlet = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-28 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-cyan-50 section-padding">
        <div className="container-max text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Our Outlets</span>
            <h1 className="text-4xl md:text-5xl font-outfit font-bold text-dark mt-2 mb-4">Visit Us <span className="gradient-text">Today</span></h1>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Find a Nandi Chemists store near you. We have multiple branches across Noida, each fully stocked and staffed with experienced professionals to meet all your healthcare needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid of Locations */}
      <section className="section-padding bg-white">
        <div className="container-max px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {outlets.map((loc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden group rounded-3xl bg-white shadow-card border border-gray-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 flex flex-col">
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm shadow-sm rounded-full px-3 py-1 text-[10px] font-bold text-primary-700 tracking-wide uppercase border border-white/50">
                    {loc.tag}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-outfit font-bold text-dark text-base mb-2 group-hover:text-primary-600 transition-colors">
                      {loc.name}
                    </h3>
                    <div className="flex items-start gap-2.5 mb-3 text-xs text-gray-400">
                      <FiMapPin size={16} className="text-primary-500 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{loc.address}</p>
                    </div>
                    <div className="flex items-center gap-2.5 mb-4 text-xs text-gray-400">
                      <FiPhone size={14} className="text-primary-500 shrink-0" />
                      <p>{loc.phone}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-50 pt-4 flex items-center justify-between gap-3 mt-auto">
                    <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                      <FiExternalLink size={14} /> Get Directions
                    </a>
                    <a href={`tel:${loc.phone.split(',')[0].trim().replace(/\s+/g, '')}`} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-dark transition-colors">
                      <FiPhone size={14} /> Call Store
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Outlet;
