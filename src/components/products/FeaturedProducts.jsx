import SectionTitle from '../common/SectionTitle';
import ProductSlider from './ProductSlider';
import { featuredProducts } from '../../data/products';

const FeaturedProducts = () => {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <SectionTitle subtitle="Our Daily Products" title="+10,000 Pharmacy products daily!" description="Discover our handpicked selection of top-rated medicines and health products." />
        <ProductSlider products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
