import SectionTitle from '../common/SectionTitle';
import CategoryCard from '../ui/CategoryCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { categories } from '../../data/categories';

const CategoriesSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <SectionTitle subtitle="Our Categories" title="Popular Categories" />
        <Swiper modules={[Navigation, Autoplay]} spaceBetween={16} slidesPerView={3} navigation autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{ 480: { slidesPerView: 4 }, 640: { slidesPerView: 5 }, 768: { slidesPerView: 6 }, 1024: { slidesPerView: 7 } }} className="pb-4">
          {categories.map((cat, i) => (
            <SwiperSlide key={cat.id} className="flex justify-center">
              <CategoryCard category={cat} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoriesSection;
