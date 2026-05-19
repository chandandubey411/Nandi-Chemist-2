import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-cyan-50">
      <div className="text-center px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
          className="text-8xl md:text-9xl font-outfit font-black gradient-text mb-4">
          404
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-outfit font-bold text-dark mb-3">
          Page Not Found
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-gray-500 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been removed or the URL might be incorrect.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary">Go Home</Link>
          <Link to="/shop" className="btn-secondary">Browse Shop</Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
