import ProductCard from './ProductCard';
import Loader from '../common/Loader';

const ProductGrid = ({ products, loading = false, columns = 4 }) => {
  if (loading) return <Loader type="skeleton" count={columns} />;
  const colsClass = columns === 3 ? 'lg:grid-cols-3' : columns === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4';
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${colsClass} gap-6`}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
};

export default ProductGrid;
