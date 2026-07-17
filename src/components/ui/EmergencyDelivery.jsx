import { motion } from 'framer-motion';
import { FiTruck, FiClock, FiPhone } from 'react-icons/fi';

const EmergencyDelivery = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-dark to-gray-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-500 rounded-full blur-3xl" />
      </div>
      <div className="container-max relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 rounded-full px-4 py-1.5 text-xs font-bold mb-4">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> EMERGENCY SERVICE
              </span>
              <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-4">24/7 Emergency<br /><span className="text-cyan-400">Medicine Delivery</span></h2>
              <p className="text-gray-400 mb-6 max-w-md">Need urgent medicines? We deliver essential medications round the clock. Just call or order online.</p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+919871200232" className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-cyan-500 px-6 py-3 rounded-2xl font-semibold hover:shadow-glow transition-all">
                  <FiPhone /> Call Now
                </a>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <FiClock /> Avg. delivery: 15 mins
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex gap-4">
            {[
              { icon: <FiTruck size={28} />, label: 'Express\nDelivery', color: 'from-primary-500/20 to-cyan-500/20' },
              { icon: <FiClock size={28} />, label: '24/7\nService', color: 'from-green-500/20 to-emerald-500/20' },
              { icon: <FiPhone size={28} />, label: 'Instant\nSupport', color: 'from-orange-500/20 to-amber-500/20' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center gap-2 border border-white/10`}>
                <span className="text-white">{item.icon}</span>
                <span className="text-[10px] text-gray-300 text-center whitespace-pre-line">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyDelivery;
