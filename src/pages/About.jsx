import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import { FiShield, FiTruck, FiUsers, FiAward, FiHeart, FiGlobe, FiMapPin, FiPhone, FiExternalLink } from 'react-icons/fi';

const stats = [
  { icon: <FiShield size={28} />, value: '100%', label: 'Authentic Products', color: 'bg-blue-100 text-blue-600' },
  { icon: <FiTruck size={28} />, value: '15 Min', label: 'Express Delivery', color: 'bg-green-100 text-green-600' },
  { icon: <FiUsers size={28} />, value: '50K+', label: 'Happy Customers', color: 'bg-purple-100 text-purple-600' },
  { icon: <FiAward size={28} />, value: '10K+', label: 'Products Available', color: 'bg-amber-100 text-amber-600' },
];

const values = [
  { icon: <FiHeart size={24} />, title: 'Customer First', desc: 'Every decision we make puts our customers health and satisfaction first.' },
  { icon: <FiShield size={24} />, title: 'Quality Assured', desc: 'We source only from licensed and verified pharmaceutical distributors.' },
  { icon: <FiGlobe size={24} />, title: 'Accessible Healthcare', desc: 'Making quality healthcare accessible and affordable for everyone in India.' },
];

const About = () => {
  useEffect(() => {
    // Scroll to #locations if hash is present
    if (window.location.hash === '#locations') {
      setTimeout(() => {
        const el = document.getElementById('locations');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-28 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-cyan-50 section-padding">
        <div className="container-max text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl md:text-5xl font-outfit font-bold text-dark mt-2 mb-4">Trusted Name <span className="gradient-text">Experienced People</span></h1>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">Since 1954, we have been on a mission to make healthcare accessible, affordable, and reliable. From genuine medicines to wellness products, NandiChemist is your one-stop health partner. We are NOT a MRP shop!</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-card transition-all">
                <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mx-auto mb-3`}>{stat.icon}</div>
                <p className="text-2xl font-outfit font-bold text-dark">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionTitle subtitle="Our Story" title="Built with Care, Delivered with Love" align="left" />
              <p className="text-gray-500 leading-relaxed mb-4">Founded in 1954, NandiChemist started with a simple vision — to ensure that no one has to worry about finding genuine medicines at fair prices.</p>
              <p className="text-gray-500 leading-relaxed">Today, we serve thousands of customers across Noida with 15-minute express delivery in Sector-75, 24/7 customer support, and the widest range of pharmaceutical products available.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative">
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format" alt="Our Story" className="rounded-3xl shadow-lg w-full" />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-2xl p-4 shadow-glow">
                <p className="text-2xl font-outfit font-bold">70+</p>
                <p className="text-xs">Years of Trust</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <SectionTitle subtitle="Our Values" title="What We Stand For" />
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-card transition-all">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">{v.icon}</div>
                <h3 className="font-outfit font-bold text-dark mb-2">{v.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="section-padding bg-gray-50/50 scroll-mt-24">
        <div className="container-max">
          <SectionTitle subtitle="Our Locations" title="Visit Us Today" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sector-75 (Dasnac Jewel)",
                tag: "Main Branch",
                address: "GF Shop No. 06, GH-14, Eco City Dasnac, Sector-75, Noida, Gautam Buddh Nagar (U.P.) - 201301",
                image: "/locations/dasnac-sector-75.jpg",
                phone: "+91 8586850840, +91 8586850187",
                mapUrl: "https://maps.google.com/?q=Nandi+Chemists+Dasnac+Jewel+Sector-75+Noida"
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
              },
              {
                name: "Sector-40 (F-64 C)",
                tag: "Sector-40 Store",
                address: "F-64 C, Shop No. 4, Sector-40, Noida (U.P.) - 201301",
                image: "/locations/sector-40.png",
                phone: "+91 9871200232, +91 9871200237",
                mapUrl: "https://maps.google.com/?q=Nandi+Chemists+Sector-40+Noida"
              }
            ].map((loc, i) => (
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
                    <div className="flex items-start gap-2.5 mb-4 text-xs text-gray-400">
                      <FiMapPin size={16} className="text-primary-500 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{loc.address}</p>
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

export default About;
