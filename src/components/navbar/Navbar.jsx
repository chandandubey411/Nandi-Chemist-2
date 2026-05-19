import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../redux/slices/cartSlice';
import { useCartUI } from '../../context/CartContext';
import SearchBar from '../ui/SearchBar';
import { categories } from '../../data/categories';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const { openCart } = useCartUI();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-glass py-2' : 'bg-white/90 backdrop-blur-md py-3'}`}>
        <div className="container-max flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src="/logo.svg" alt="Nandi Chemists Logo" className="h-10 w-auto object-contain" />
            <div className="hidden sm:flex flex-col">
              <span className="font-outfit font-bold text-[16px] text-primary-600 leading-tight tracking-wide">NANDI</span>
              <span className="font-outfit font-bold text-[16px] text-primary-800 leading-tight tracking-wide">CHEMISTS</span>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-xl">
            <SearchBar />
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className="nav-link">{link.name}</Link>
            ))}
            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className="nav-link flex items-center gap-1">Categories <FiChevronDown size={14} /></button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 w-52 z-50">
                    {categories.map(cat => (
                      <button key={cat.id} onClick={() => { navigate(`/shop?category=${cat.name}`); setCatOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 flex items-center gap-2 transition-colors">
                        <span>{cat.icon}</span>{cat.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button onClick={openCart} className="relative p-2.5 rounded-xl hover:bg-primary-50 transition-colors group">
              <FiShoppingCart size={20} className="text-gray-600 group-hover:text-primary-600" />
              {cartCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-cyan-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2.5 rounded-xl hover:bg-primary-50">
              <FiMenu size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-2 pt-1">
          <SearchBar />
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/40" onClick={() => setMenuOpen(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-outfit font-bold text-lg">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100"><FiX size={20} /></button>
              </div>
              <div className="p-4 space-y-1">
                {navLinks.map(link => (
                  <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors">
                    {link.name}
                  </Link>
                ))}
                <div className="pt-3 border-t mt-3">
                  <p className="text-xs text-gray-400 px-4 mb-2">Categories</p>
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => { navigate(`/shop?category=${cat.name}`); setMenuOpen(false); }}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-primary-50 flex items-center gap-2">
                      <span>{cat.icon}</span>{cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
