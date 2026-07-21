import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiExternalLink, FiArrowRight } from 'react-icons/fi';

const primaryLocations = [
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
  }
];

const HomeLocations = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-50">
      <div className="container-max px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-red-500">
              Our Presence
            </span>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-gray-800 mt-2 mb-3">
              Visit Our <span className="text-green-600">Pharmacy Stores</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Serving you across multiple convenient locations in Noida with authentic medicines, healthcare devices, and expert care.
            </p>
          </div>

          <div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0 shrink-0"
          >
            <Link
              to="/outlet"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-md shadow-red-100 hover:shadow-lg transition-all duration-300 group"
            >
              See All Locations
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {primaryLocations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden group rounded-3xl bg-white shadow-card border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 flex flex-col"
            >
              {/* Image Area */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm shadow-sm rounded-full px-3 py-1 text-[10px] font-bold text-red-600 tracking-wide uppercase border border-white/50">
                  {loc.tag}
                </div>
              </div>

              {/* Details Area */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-outfit font-bold text-dark text-base mb-2 group-hover:text-green-700 transition-colors">
                    {loc.name}
                  </h3>
                  <div className="flex items-start gap-2.5 mb-3 text-xs text-gray-400">
                    <FiMapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{loc.address}</p>
                  </div>
                  <div className="flex items-center gap-2.5 mb-4 text-xs text-gray-400">
                    <FiPhone size={14} className="text-green-600 shrink-0" />
                    <p>{loc.phone}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-50 pt-4 flex items-center justify-between gap-3 mt-auto">
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
                  >
                    <FiExternalLink size={14} /> Get Directions
                  </a>
                  <a
                    href={`tel:${loc.phone.split(',')[0].trim().replace(/\s+/g, '')}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-dark transition-colors"
                  >
                    <FiPhone size={14} /> Call Store
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeLocations;
