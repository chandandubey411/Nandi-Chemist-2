import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { Suspense, lazy, useState } from 'react';
import SearchBar from '../ui/SearchBar';

const FloatingPills = lazy(() => import('../three/FloatingPills'));

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      {/* Gradient orbs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-float-slow" />

      {/* 3D Pills */}
      <Suspense fallback={null}>
        <FloatingPills className="opacity-60" />
      </Suspense>

      <div className="container-max relative z-10 px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm border border-white/50">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-gray-600">15 Min Express Delivery in Sector-75</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold text-dark leading-tight mb-6">
              Healthy Tablets{' '}
              <span className="gradient-text">&amp; Medicines</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-600 font-medium">at Your Doorstep</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-gray-500 text-lg mb-8 max-w-lg leading-relaxed">
              Trusted Name Experienced People. Since 1954. Order medicines, wellness products, and healthcare essentials with guaranteed authenticity.
            </motion.p>

            {/* Search */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="max-w-lg mb-8">
              <SearchBar />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/918586850840?text=Hello%2C%20I%20want%20to%20order%20medicines', '_blank')}
                className="btn-primary flex items-center gap-2 text-base">
                Order on WhatsApp <FiArrowRight />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('query-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary text-base">
                Send a Query
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="flex gap-8 mt-10">
              {[
                { value: '10K+', label: 'Products' },
                { value: '50K+', label: 'Customers' },
                { value: '99%', label: 'Authentic' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-outfit font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block relative">
            <div className="relative w-full h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-cyan-400/20 rounded-[3rem] animate-pulse-glow" />
              <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=500&fit=crop&auto=format"
                alt="Medicines and Healthcare" className="w-full h-full object-cover rounded-[3rem] shadow-2xl relative z-10" />
              {/* Floating cards */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-6 top-20 bg-white rounded-2xl shadow-lg p-3 z-20 flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-lg">💊</div>
                <div><p className="text-xs font-bold text-dark">Medicine</p><p className="text-[10px] text-gray-400">Genuine products</p></div>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -right-6 top-1/2 bg-white rounded-2xl shadow-lg p-3 z-20 flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-lg">🩺</div>
                <div><p className="text-xs font-bold text-dark">Health Care</p><p className="text-[10px] text-gray-400">Expert consultation</p></div>
              </motion.div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}
                className="absolute left-10 -bottom-4 bg-white rounded-2xl shadow-lg p-3 z-20 flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-lg">⚡</div>
                <div><p className="text-xs font-bold text-dark">Fast Delivery</p><p className="text-[10px] text-gray-400">15 min express</p></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
