import { motion } from 'framer-motion';
import { FiShield, FiHeart, FiActivity, FiPlusCircle } from 'react-icons/fi';

const features = [
  { icon: <FiPlusCircle size={24} />, title: 'Medicine', desc: 'Genuine pharmacy products', color: 'bg-blue-100 text-blue-600' },
  { icon: <FiHeart size={24} />, title: 'Wellness', desc: 'Health & wellness essentials', color: 'bg-pink-100 text-pink-600' },
  { icon: <FiActivity size={24} />, title: 'Diagnostic', desc: 'Lab tests & health checkups', color: 'bg-green-100 text-green-600' },
  { icon: <FiShield size={24} />, title: 'Health Corner', desc: 'Expert health advice', color: 'bg-amber-100 text-amber-600' },
];

const FeatureStrip = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-card transition-all cursor-pointer">
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center shrink-0`}>{f.icon}</div>
              <div>
                <h4 className="font-semibold text-dark text-sm">{f.title}</h4>
                <p className="text-xs text-gray-400">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureStrip;
