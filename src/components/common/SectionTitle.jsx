import { motion } from 'framer-motion';

const SectionTitle = ({ subtitle, title, description, align = 'center', className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      {subtitle && (
        <span className="inline-block text-primary-500 font-semibold text-sm tracking-wider uppercase mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-outfit font-bold text-dark leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-base">{description}</p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
