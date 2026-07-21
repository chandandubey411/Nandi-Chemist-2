import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '918586850840';
const WHATSAPP_MESSAGE = 'Hello! I want to order medicines.';

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex items-center gap-3">
      {/* Tooltip label */}
      <div
        className={`transition-all duration-300 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <span className="bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
          Order on WhatsApp
        </span>
      </div>

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
        style={{ boxShadow: '0 4px 24px rgba(37,211,102,0.45)' }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        <FaWhatsapp className="text-white text-3xl relative z-10" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
