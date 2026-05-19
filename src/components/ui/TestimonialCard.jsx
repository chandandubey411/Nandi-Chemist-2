import { motion } from 'framer-motion';
import RatingStars from './RatingStars';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-6 shadow-card border border-gray-100 relative h-full"
    >
      <FaQuoteLeft className="text-primary-200 text-2xl absolute top-4 right-4" />
      <div className="flex items-center gap-3 mb-4">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary-100" />
        <div>
          <h4 className="font-semibold text-dark text-sm">{testimonial.name}</h4>
          <p className="text-xs text-gray-400">{testimonial.location}</p>
        </div>
      </div>
      <RatingStars rating={testimonial.rating} showCount={false} />
      <p className="text-gray-600 text-sm mt-3 leading-relaxed">{testimonial.text}</p>
      <p className="text-xs text-gray-400 mt-3">{testimonial.date}</p>
    </motion.div>
  );
};

export default TestimonialCard;
