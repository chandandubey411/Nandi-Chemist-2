import { motion } from 'framer-motion';

const OfferBanner = ({ banner, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className={`relative bg-gradient-to-br ${banner.gradient} rounded-3xl overflow-hidden cursor-pointer group p-5 md:p-6 flex flex-col justify-between min-h-[180px]`}
    >
      {banner.tag && (
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{banner.tag}</span>
      )}
      <div className="mt-2">
        <h3 className={`text-lg md:text-xl font-outfit font-bold ${banner.textColor} leading-snug`}>{banner.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{banner.subtitle}</p>
      </div>
      <button className="mt-3 text-xs font-semibold text-primary-600 flex items-center gap-1 group-hover:gap-2 transition-all">
        {banner.cta} <span>→</span>
      </button>
      <div className="absolute -right-4 -bottom-4 w-28 h-28 opacity-30 group-hover:opacity-50 transition-opacity">
        <img src={banner.image} alt="" className="w-full h-full object-cover rounded-2xl" />
      </div>
    </motion.div>
  );
};

export default OfferBanner;
