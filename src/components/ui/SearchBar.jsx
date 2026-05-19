import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';

const SearchBar = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (value) => {
    setQuery(value);
    if (value.length > 1) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.category.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <FiSearch className="absolute left-4 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          placeholder="Search medicines, health products..."
          className="w-full pl-11 pr-10 py-3 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all text-sm"
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }} className="absolute right-3 text-gray-400 hover:text-gray-600">
            <FiX size={16} />
          </button>
        )}
      </div>
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">
            {results.map((product) => (
              <button key={product.id} onClick={() => { navigate(`/product/${product.id}`); setIsOpen(false); setQuery(''); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary-50 transition-colors text-left">
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-dark truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.category} • ₹{product.price}</p>
                </div>
              </button>
            ))}
            <button onClick={() => { navigate(`/shop?q=${query}`); setIsOpen(false); }}
              className="w-full px-4 py-3 text-sm text-primary-600 font-medium hover:bg-primary-50 border-t border-gray-100">
              View all results for "{query}"
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
