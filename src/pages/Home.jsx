import { motion } from 'framer-motion';
import HeroSection from '../components/hero/HeroSection';
import PharmaBrands from '../components/ui/PharmaBrands';
import HomeLocations from '../components/ui/HomeLocations';
import PrescriptionUpload from '../components/ui/PrescriptionUpload';
import EmergencyDelivery from '../components/ui/EmergencyDelivery';
import TestimonialsSection from '../components/ui/TestimonialsSection';
import QueryForm from '../components/ui/QueryForm';

const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <HeroSection />
      <PharmaBrands />
      <HomeLocations />
      <PrescriptionUpload />
      <EmergencyDelivery />
      <QueryForm />
      <TestimonialsSection />
    </motion.div>
  );
};

export default Home;
