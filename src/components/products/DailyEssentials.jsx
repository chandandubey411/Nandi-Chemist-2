import SectionTitle from '../common/SectionTitle';
import ProductGrid from './ProductGrid';
import { bestsellerProducts } from '../../data/products';

const DailyEssentials = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <SectionTitle subtitle="Daily Health Essentials" title="Bestselling Health Products" description="Most trusted products by our customers nationwide." />
        <ProductGrid products={bestsellerProducts.slice(0, 8)} />
      </div>
    </section>
  );
};

export default DailyEssentials;
