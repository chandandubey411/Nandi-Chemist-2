import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck } from 'react-icons/fi';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setTimeout(() => { setSubmitted(false); setEmail(''); }, 3000); }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <div className="relative flex-1">
        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" required
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-white/30 bg-white/20 backdrop-blur text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50" />
      </div>
      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit"
        className={`px-8 py-3.5 rounded-2xl font-semibold transition-all ${submitted ? 'bg-green-500 text-white' : 'bg-white text-primary-600 hover:shadow-lg'}`}>
        {submitted ? <span className="flex items-center gap-2"><FiCheck /> Subscribed!</span> : 'Subscribe'}
      </motion.button>
    </form>
  );
};

export default NewsletterForm;
