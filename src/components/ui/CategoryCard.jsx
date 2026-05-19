import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category, index }) => {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -8, scale: 1.05 }}
      onClick={() => navigate(`/shop?category=${category.name}`)}
      className="flex flex-col items-center gap-3 group cursor-pointer"
    >
      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${category.color} border-2 ${category.border} flex items-center justify-center shadow-card group-hover:shadow-card-hover transition-all duration-300 overflow-hidden`}>
        <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300" />
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors text-center leading-tight">{category.name}</span>
    </motion.button>
  );
};

export default CategoryCard;
