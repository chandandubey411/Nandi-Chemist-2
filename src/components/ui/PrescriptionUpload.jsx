import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import SectionTitle from '../common/SectionTitle';

const PrescriptionUpload = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-cyan-50">
      <div className="container-max">
        <SectionTitle subtitle="Upload Prescription" title="Order with Prescription" description="Simply upload your prescription and we'll deliver your medicines to your doorstep." />
        <div className="max-w-xl mx-auto">
          <motion.div whileHover={{ scale: 1.01 }}
            className="upload-area rounded-3xl p-8 text-center bg-white/60 backdrop-blur-sm border border-cyan-100 shadow-sm">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 mx-auto">
              <FiCheck className="text-green-600" size={28} />
            </motion.div>
            <h3 className="font-outfit font-bold text-xl text-dark mb-2">Send via WhatsApp</h3>
            <p className="text-sm text-gray-500 mb-6">Click the button below to open WhatsApp and send us a photo of your prescription. We'll handle the rest!</p>
            <button 
              onClick={() => window.open('https://wa.me/918586850840?text=Hi,%20I%20would%20like%20to%20order%20medicines%20using%20my%20prescription.', '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl px-8 py-3 transition-colors inline-flex items-center gap-2">
              Open WhatsApp
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrescriptionUpload;
