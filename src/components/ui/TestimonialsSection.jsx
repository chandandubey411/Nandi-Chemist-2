import SectionTitle from '../common/SectionTitle';
import TestimonialCard from '../ui/TestimonialCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { testimonials } from '../../data/testimonials';

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <SectionTitle subtitle="Testimonials" title="What Our Customers Say" description="Trusted by 50,000+ happy customers across India." />
        <Swiper modules={[Autoplay, Pagination]} spaceBetween={24} slidesPerView={1} pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} className="pb-12">
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}><TestimonialCard testimonial={t} /></SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
