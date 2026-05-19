/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5f9',
          100: '#dce8f1',
          200: '#bed2e4',
          300: '#94b3d1',
          400: '#648dbb',
          500: '#00477b',
          600: '#003a68',
          700: '#002e54',
          800: '#002544',
          900: '#001c34',
        },
        cyan: {
          50: '#fef7f0',
          100: '#fdeadb',
          200: '#f9cfb0',
          300: '#f5ad7a',
          400: '#f18846',
          500: '#e87019',
          600: '#d65b12',
          700: '#b14511',
          800: '#8d3714',
          900: '#712e13',
        },
        dark: '#0F172A',
        surface: '#F8FAFC',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #f0f5f9 0%, #bed2e4 30%, #f9cfb0 60%, #fef7f0 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(0,71,123,0.1) 0%, rgba(232,112,25,0.1) 100%)',
        'blue-gradient': 'linear-gradient(135deg, #00477b 0%, #e87019 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'float 8s ease-in-out infinite 1s',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'gradient': 'gradient 4s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,71,123,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(232,112,25,0.8)' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,71,123,0.1)',
        'card-hover': '0 8px 40px rgba(0,71,123,0.25)',
        'glass': '0 8px 32px rgba(0,0,0,0.08)',
        'glow': '0 0 30px rgba(0,71,123,0.5)',
        'glow-cyan': '0 0 30px rgba(232,112,25,0.5)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};