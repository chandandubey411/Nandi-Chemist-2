import { useState } from 'react';
import SectionTitle from '../components/common/SectionTitle';
import { FiShield, FiTruck, FiUsers, FiAward, FiHeart, FiGlobe } from 'react-icons/fi';

const stats = [
  { icon: <FiShield size={28} />, value: '100%', label: 'Authentic Products', color: 'bg-blue-100 text-blue-600' },
  { icon: <FiTruck size={28} />, value: '15 Min', label: 'Express Delivery', color: 'bg-green-100 text-green-600' },
  { icon: <FiUsers size={28} />, value: '50K+', label: 'Happy Customers', color: 'bg-purple-100 text-purple-600' },
  { icon: <FiAward size={28} />, value: '10K+', label: 'Products Available', color: 'bg-amber-100 text-amber-600' },
];

const values = [
  { icon: <FiHeart size={24} />, title: 'Customer First', desc: 'Every decision we make puts our customers health and satisfaction first.' },
  { icon: <FiShield size={24} />, title: 'Quality Assured', desc: 'We source only from licensed and verified pharmaceutical distributors.' },
  { icon: <FiGlobe size={24} />, title: 'Accessible Healthcare', desc: 'Making quality healthcare accessible and affordable for everyone in India.' },
];

const faqs = [
  {
    q: "Are all your medicines authentic?",
    a: "Yes, 100%. We source all our medicines and healthcare products directly from licensed pharmaceutical companies and authorized distributors. Every product undergoes strict quality checks."
  },
  {
    q: "Do you offer home delivery?",
    a: "Yes! We offer free home delivery within a 3km radius of any of our stores for orders above ₹300. For Sector-75, we also offer 15-minute express delivery."
  },
  {
    q: "Do I need a prescription to order?",
    a: "For prescription-only medicines (Schedule H/H1/X), a valid prescription from a registered medical practitioner is mandatory by law. You can upload it on our website or share it via WhatsApp."
  },
  {
    q: "Are you an MRP shop?",
    a: "No, we are NOT an MRP shop! We believe in making healthcare affordable, which is why we offer flat discounts on a wide range of medicines and wellness products."
  },
  {
    q: "What are your store timings?",
    a: "Most of our outlets are open from 8:00 AM to 11:00 PM, 7 days a week. For specific branch timings, please contact the respective store directly."
  },
  {
    q: "How can I place an order?",
    a: "You can easily place an order by uploading your prescription on our website, ordering through our shop page, or simply sending a photo of your prescription/order list to our WhatsApp number (+91 8586850840)."
  }
];

const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gray-50 rounded-2xl p-6 transition-all duration-300 border border-gray-100 hover:border-primary-100 hover:bg-white hover:shadow-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left font-outfit font-bold text-gray-800 hover:text-primary-600 transition-colors"
      >
        <span className="text-base sm:text-lg">{q}</span>
        <span className="text-primary-500 font-bold text-xl ml-4">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <p className="text-sm text-gray-500 mt-3 leading-relaxed font-sans border-t border-gray-100/50 pt-3">
          {a}
        </p>
      )}
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-cyan-50 section-padding">
        <div className="container-max text-center">
          <div>
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl md:text-5xl font-outfit font-bold text-dark mt-2 mb-4">Trusted Name <span className="gradient-text">Experienced People</span></h1>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">Since 1954, we have been on a mission to make healthcare accessible, affordable, and reliable. From genuine medicines to wellness products, NandiChemist is your one-stop health partner. We are NOT a MRP shop!</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i}
                className="text-center p-6 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-card transition-all">
                <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mx-auto mb-3`}>{stat.icon}</div>
                <p className="text-2xl font-outfit font-bold text-dark">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle subtitle="Our Story" title="Built with Care, Delivered with Love" align="left" />
              <p className="text-gray-500 leading-relaxed mb-4">Founded in 1954, NandiChemist started with a simple vision — to ensure that no one has to worry about finding genuine medicines at fair prices.</p>
              <p className="text-gray-500 leading-relaxed">Today, we serve thousands of customers across Noida with 15-minute express delivery in Sector-75, 24/7 customer support, and the widest range of pharmaceutical products available.</p>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format" alt="Our Story" className="rounded-3xl shadow-lg w-full" />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-2xl p-4 shadow-glow">
                <p className="text-2xl font-outfit font-bold">70+</p>
                <p className="text-xs">Years of Trust</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <SectionTitle subtitle="Our Values" title="What We Stand For" />
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i}
                className="text-center p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-card transition-all">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">{v.icon}</div>
                <h3 className="font-outfit font-bold text-dark mb-2">{v.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-gray-50/50">
        <div className="container-max px-4">
          <SectionTitle subtitle="Frequently Asked Questions" title="Got Questions? We Have Answers" />
          <div className="max-w-3xl mx-auto grid gap-4 mt-8">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
