import { motion } from 'framer-motion';
import HeroSection from '../components/hero/HeroSection';
import FeatureStrip from '../components/hero/FeatureStrip';
import PromoBannerGrid from '../components/hero/PromoBannerGrid';
import CategoriesSection from '../components/categories/CategoriesSection';
import FeaturedProducts from '../components/products/FeaturedProducts';
import DailyEssentials from '../components/products/DailyEssentials';
import PrescriptionUpload from '../components/ui/PrescriptionUpload';
import EmergencyDelivery from '../components/ui/EmergencyDelivery';
import TestimonialsSection from '../components/ui/TestimonialsSection';
import BlogSection from '../components/ui/BlogSection';

const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <HeroSection />
      <FeatureStrip />
      <PromoBannerGrid />
      <CategoriesSection />
      <FeaturedProducts />
      <DailyEssentials />
      <PrescriptionUpload />
      <EmergencyDelivery />
      <TestimonialsSection />
      <BlogSection />
    </motion.div>
  );
};

export default Home;
