import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

const AIHealthAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: "Hi! 👋 I'm your AI Health Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      const replies = [
        "I'd recommend consulting a doctor for personalized advice. Meanwhile, I can help you find relevant medicines.",
        "Great question! Let me search our database for the best options for you.",
        "You can upload your prescription for a more accurate recommendation. Would you like to try that?",
        "Here are some popular products in that category. Check our Shop page for more details!",
      ];
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: replies[Math.floor(Math.random() * replies.length)] }]);
    }, 1000);
  };

  return (
    <>
      {/* FAB */}
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-cyan-500 text-white flex items-center justify-center shadow-glow">
        {isOpen ? <FiX size={22} /> : <FiMessageCircle size={22} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-[60] w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-cyan-500 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">🤖</div>
                <div>
                  <h4 className="text-white font-semibold text-sm">AI Health Assistant</h4>
                  <p className="text-white/70 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${msg.from === 'user' ? 'bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-br-md' : 'bg-gray-100 text-gray-700 rounded-bl-md'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 p-3 flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..." className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-primary-400" />
              <button onClick={handleSend} className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-cyan-500 text-white flex items-center justify-center hover:shadow-glow transition-shadow">
                <FiSend size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIHealthAssistant;
