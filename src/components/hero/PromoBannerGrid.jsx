import SectionTitle from '../common/SectionTitle';
import OfferBanner from '../ui/OfferBanner';
import { banners } from '../../data/banners';

const PromoBannerGrid = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {banners.map((banner, i) => (
            <OfferBanner key={banner.id} banner={banner} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBannerGrid;
