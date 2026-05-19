import { motion } from 'framer-motion';
import { useState } from 'react';
import Input from '../components/common/Input';
import SectionTitle from '../components/common/SectionTitle';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheck } from 'react-icons/fi';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const isFormValid = Object.values(form).every(val => val.trim() !== '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please fill in all required fields.");
      return;
    }

    const message = `*New Contact Form Inquiry*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Subject:* ${form.subject}\n\n` +
      `*Message:*\n${form.message}`;

    const WHATSAPP_NUMBER = '918586850840';
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  const contactInfo = [
    { icon: <FiPhone />, title: 'Phone', value: '+91 8586850840', href: 'tel:+918586850840', color: 'bg-blue-100 text-blue-600' },
    { icon: <FiMail />, title: 'Email', value: 'Nandichemists75@gmail.com', href: 'mailto:Nandichemists75@gmail.com', color: 'bg-green-100 text-green-600' },
    { icon: <FiMapPin />, title: 'Address', value: 'Shop no 6, Ground Floor, Dasnac Jewel of Noida, Sector 75, Noida, UP 201316', href: '#', color: 'bg-purple-100 text-purple-600' },
    { icon: <FiClock />, title: 'Hours', value: '10:00 AM - 10:00 PM', href: '#', color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-28 pb-16">
      <section className="bg-gradient-to-br from-primary-50 to-cyan-50 section-padding">
        <div className="container-max text-center">
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-outfit font-bold text-dark mt-2 mb-4">Contact Us</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((c, i) => (
                <motion.a key={i} href={c.href} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                  <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center shrink-0`}>{c.icon}</div>
                  <div>
                    <h4 className="font-semibold text-dark text-sm">{c.title}</h4>
                    <p className="text-gray-400 text-sm">{c.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-6 md:p-8">
                <h3 className="font-outfit font-bold text-xl mb-6">Send us a Message</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full Name *" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="John Doe" />
                  <Input label="Email *" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="john@example.com" />
                  <Input label="Phone *" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" />
                  <Input label="Subject *" value={form.subject} onChange={(e) => update('subject', e.target.value)} placeholder="How can we help?" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                  <textarea value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Write your message..."
                    rows={5} className="input-field resize-none" />
                </div>
                <motion.button whileHover={{ scale: isFormValid ? 1.02 : 1 }} whileTap={{ scale: isFormValid ? 0.98 : 1 }} type="submit"
                  disabled={!isFormValid}
                  className={`${submitted ? 'bg-green-500' : 'bg-gradient-to-r from-primary-500 to-cyan-500'} ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''} text-white font-semibold rounded-2xl px-8 py-3 flex items-center gap-2 transition-all`}>
                  {submitted ? <><FiCheck /> Message Sent!</> : <><FiSend /> Send Message</>}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
