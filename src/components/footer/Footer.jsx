import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import NewsletterForm from '../ui/NewsletterForm';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Medicines', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  const categoryLinks = ['OTC Deals', 'Vitamins', 'Ayush', 'Devices', 'Fitness', 'Personal Care'];
  const socials = [
    { icon: <FaFacebookF />, href: '#' },
    { icon: <FaTwitter />, href: '#' },
    { icon: <FaInstagram />, href: '#' },
    { icon: <FaLinkedinIn />, href: '#' },
    { icon: <FaYoutube />, href: '#' },
  ];

  return (
    <footer className="bg-dark text-white">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-primary-600 to-cyan-600 py-12 px-4">
        <div className="container-max text-center">
          <h3 className="text-2xl md:text-3xl font-outfit font-bold mb-2">Stay Healthy, Stay Updated</h3>
          <p className="text-white/70 mb-6 text-sm">Subscribe to get health tips, exclusive offers and medicine reminders.</p>
          <NewsletterForm />
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-max py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.svg" alt="Nandi Chemists Logo" className="h-10 w-auto object-contain" />
              <div className="flex gap-1.5">
                <span className="font-outfit font-bold text-[16px] text-red-600 leading-tight tracking-wide">NANDI</span>
                <span className="font-outfit font-bold text-[16px] text-green-600 leading-tight tracking-wide">CHEMISTS</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">Trusted Name Experienced People. Since 1954. 15-minute express delivery in Sector-75. 3KM Free Home Delivery on minimum orders of ₹300. We are NOT a MRP shop!</p>
            <div className="flex gap-2">
              {socials.map((s, i) => (
                <a key={i} href={s.href} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300 text-sm">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.path}><Link to={l.path} className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">{l.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-outfit font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {categoryLinks.map(c => (
                <li key={c}><Link to={`/shop?category=${c}`} className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-outfit font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a href="tel:+918586850840" className="flex items-center gap-3 text-gray-400 text-sm hover:text-cyan-400 transition-colors">
                <FiPhone size={16} /> +91 8586850840
              </a>
              <a href="mailto:Nandichemists75@gmail.com" className="flex items-center gap-3 text-gray-400 text-sm hover:text-cyan-400 transition-colors">
                <FiMail size={16} /> Nandichemists75@gmail.com
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <FiMapPin size={16} className="shrink-0 mt-0.5" /> Shop no 6, Ground Floor, Dasnac Jewel of Noida, Sector 75, Noida, UP 201316
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-4 px-4">
        <div className="container-max flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2025 NandiChemist. All rights reserved.</p>
          <p>⚠️ Disclaimer: This website is for informational purposes only. Always consult a doctor before taking any medication.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
