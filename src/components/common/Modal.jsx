import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, children, title, size = 'md' }) => {
  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl', xl: 'max-w-6xl' };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', damping: 25 }} className={`relative ${sizes[size]} w-full bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-outfit font-bold text-dark">{title}</h3>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors"><FiX size={20} /></button>
              </div>
            )}
            {!title && (
              <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"><FiX size={20} /></button>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
