import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { Suspense, lazy, useState, useEffect } from 'react';
import SearchBar from '../ui/SearchBar';

const FloatingPills = lazy(() => import('../three/FloatingPills'));

const HeroSection = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const MotionDiv = isMobile ? 'div' : motion.div;
  const MotionH1 = isMobile ? 'h1' : motion.h1;
  const MotionP = isMobile ? 'p' : motion.p;
  const MotionButton = isMobile ? 'button' : motion.button;

  const animateX = isMobile ? {} : { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 } };
  const animateY = (delay) => isMobile ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay } };
  const animateH1 = isMobile ? {} : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3, duration: 0.7 } };
  const animateFade = (delay) => isMobile ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay } };
  const hoverTap = isMobile ? {} : { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } };

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
          <MotionDiv {...animateX}>
            <MotionDiv className="inline-flex flex-wrap items-center gap-x-2 gap-y-1.5 bg-white/85 backdrop-blur-sm rounded-[1.25rem] sm:rounded-full px-4 py-2 mb-6 shadow-sm border border-white/60 max-w-full" {...animateY(0.2)}>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-xs font-bold text-primary-700">15 Min Express Delivery in Sector-40</span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span className="text-xs font-extrabold text-green-600 tracking-wide uppercase">Free Delivery within 3km</span>
            </MotionDiv>

            <MotionH1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold text-dark leading-tight mb-6" {...animateH1}>
              Healthy Tablets{' '}
              <span className="gradient-text">&amp; Medicines</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-600 font-medium">at Your Doorstep</span>
            </MotionH1>

            <MotionP className="text-gray-500 text-lg mb-8 max-w-lg leading-relaxed" {...animateFade(0.5)}>
              Trusted Name Experienced People. Since 1954. Order medicines, wellness products, and healthcare essentials with guaranteed authenticity.
            </MotionP>

            {/* Search */}
            <MotionDiv className="max-w-lg mb-8" {...animateY(0.6)}>
              <SearchBar />
            </MotionDiv>

            {/* CTA Buttons */}
            <MotionDiv className="flex flex-wrap gap-4" {...animateY(0.7)}>
              <MotionButton
                onClick={() => window.open('https://wa.me/919871200232?text=Hello%2C%20I%20want%20to%20order%20medicines', '_blank')}
                className="btn-primary flex items-center gap-2 text-base" {...hoverTap}>
                Order on WhatsApp <FiArrowRight />
              </MotionButton>
              <MotionButton
                onClick={() => document.getElementById('query-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary text-base" {...hoverTap}>
                Send a Query
              </MotionButton>
            </MotionDiv>

            {/* Stats */}
            <MotionDiv className="flex flex-wrap gap-x-8 gap-y-4 mt-10" {...animateFade(0.9)}>
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
            </MotionDiv>
          </MotionDiv>

          {/* Right - Hero Image */}
          <MotionDiv className="hidden lg:block relative" {...isMobile ? {} : { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.4, duration: 0.8 } }}>
            <div className="relative w-full h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-cyan-400/20 rounded-[3rem] animate-pulse-glow" />
              <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=500&fit=crop&auto=format"
                alt="Medicines and Healthcare" className="w-full h-full object-cover rounded-[3rem] shadow-2xl relative z-10" />
              {/* Floating cards */}
              <MotionDiv className="absolute -left-6 top-20 bg-white rounded-2xl shadow-lg p-3 z-20 flex items-center gap-2" {...isMobile ? {} : { animate: { y: [0, -10, 0] }, transition: { duration: 3, repeat: Infinity } }}>
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-lg">💊</div>
                <div><p className="text-xs font-bold text-dark">Medicine</p><p className="text-[10px] text-gray-400">Genuine products</p></div>
              </MotionDiv>
              <MotionDiv className="absolute -right-6 top-1/2 bg-white rounded-2xl shadow-lg p-3 z-20 flex items-center gap-2" {...isMobile ? {} : { animate: { y: [0, 10, 0] }, transition: { duration: 3.5, repeat: Infinity } }}>
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-lg">🩺</div>
                <div><p className="text-xs font-bold text-dark">Health Care</p><p className="text-[10px] text-gray-400">Expert consultation</p></div>
              </MotionDiv>
              <MotionDiv className="absolute left-10 -bottom-4 bg-white rounded-2xl shadow-lg p-3 z-20 flex items-center gap-2" {...isMobile ? {} : { animate: { y: [0, -8, 0] }, transition: { duration: 4, repeat: Infinity } }}>
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-lg">⚡</div>
                <div><p className="text-xs font-bold text-dark">Fast Delivery</p><p className="text-[10px] text-gray-400">15 min express</p></div>
              </MotionDiv>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
