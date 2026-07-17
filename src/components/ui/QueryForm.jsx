import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCheck, FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';

const QueryForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const isValid = Object.values(form).every(v => v.trim() !== '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const msg =
      `*New Query from Website*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*Phone:* ${form.phone}\n\n` +
      `*Message:*\n${form.message}`;

    window.open(`https://wa.me/919871200232?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="query-form" className="py-16 bg-gradient-to-br from-primary-50 to-orange-50">
      <div className="container-max px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-gray-800 mt-2 mb-3">
              Send Us a <span className="text-primary-600">Query</span>
            </h2>
            <p className="text-gray-500 text-sm">
              Have a question about a medicine? Need help with your order? We're here!
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-3.5 text-gray-400" size={15} />
                <textarea
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  placeholder="Write your query here..."
                  rows={4}
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition resize-none"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: isValid ? 1.02 : 1 }}
              whileTap={{ scale: isValid ? 0.98 : 1 }}
              type="submit"
              disabled={!isValid}
              className={`w-full py-3.5 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                submitted
                  ? 'bg-green-500'
                  : isValid
                  ? 'bg-gradient-to-r from-primary-600 to-orange-500 hover:shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {submitted ? (
                <><FiCheck /> Sent on WhatsApp!</>
              ) : (
                <><FiSend /> Send Query on WhatsApp</>
              )}
            </motion.button>

            <p className="text-center text-xs text-gray-400">
              Your query will be sent directly to our WhatsApp for quick response
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default QueryForm;
