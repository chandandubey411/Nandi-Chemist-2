import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Outlets', path: '/outlet' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-md'}`}>
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-primary-600 to-cyan-600 text-white text-[10px] sm:text-xs py-1.5 px-4 text-center font-outfit font-bold tracking-wide flex items-center justify-center gap-2">
          <span className="animate-pulse">🚚</span>
          <span>FREE HOME DELIVERY WITHIN 3KM (Min. Order ₹300)</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline text-[10px] opacity-90 uppercase font-medium">15 Min Express Delivery in Sector-75</span>
        </div>

        <div className={`container-max flex items-center justify-between gap-4 px-4 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src="/logo.svg" alt="Nandi Chemists Logo" className="h-10 w-auto object-contain" />
            <div className="flex gap-1.5">
              <span className="font-outfit font-bold text-[16px] text-red-600 leading-tight tracking-wide">NANDI</span>
              <span className="font-outfit font-bold text-[16px] text-green-600 leading-tight tracking-wide">CHEMISTS</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className="text-gray-600 hover:text-primary-600 font-medium text-sm transition-colors">{link.name}</Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/918586850840?text=Hello%2C%20I%20want%20to%20order%20medicines"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              Order on WhatsApp
            </a>
            <a href="tel:+918586850840" className="hidden md:flex items-center gap-1.5 text-primary-600 font-semibold text-sm hover:text-primary-800 transition-colors">
              <FiPhone size={15} /> 8586850840
            </a>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2.5 rounded-xl hover:bg-primary-50">
              <FiMenu size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/40" onClick={() => setMenuOpen(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-outfit font-bold text-lg text-primary-700">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100"><FiX size={20} /></button>
              </div>
              <div className="p-4 space-y-1">
                {navLinks.map(link => (
                  <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-600 font-medium transition-colors">
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 mt-2 border-t space-y-3">
                  <a href="https://wa.me/918586850840?text=Hello%2C%20I%20want%20to%20order%20medicines" target="_blank" rel="noopener noreferrer"
                    className="block w-full text-center bg-green-500 text-white font-semibold py-2.5 rounded-xl text-sm">
                    Order on WhatsApp
                  </a>
                  <a href="tel:+918586850840" className="block w-full text-center bg-primary-50 text-primary-700 font-semibold py-2.5 rounded-xl text-sm">
                    Call: 8586850840
                  </a>
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
