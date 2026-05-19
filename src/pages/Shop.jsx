import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiSearch } from 'react-icons/fi';
import ProductGrid from '../components/products/ProductGrid';
import SectionTitle from '../components/common/SectionTitle';
import { products } from '../data/products';
import { categories } from '../data/categories';

const priceRanges = [
  { label: 'Under ₹100', min: 0, max: 100 },
  { label: '₹100 - ₹500', min: 100, max: 500 },
  { label: '₹500 - ₹1000', min: 500, max: 1000 },
  { label: 'Above ₹1000', min: 1000, max: Infinity },
];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice];
      result = result.filter(p => p.price >= range.min && p.price < range.max);
    }
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [search, selectedCategory, selectedPrice, sortBy]);

  const clearFilters = () => { setSearch(''); setSelectedCategory(''); setSelectedPrice(null); setSortBy('featured'); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50/50 pt-28 pb-16">
      <div className="container-max px-4">
        <SectionTitle title="Shop Medicines & Health Products" subtitle="Browse Products" description={`Showing ${filtered.length} products`} />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."
              className="input-field pl-11" />
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-full sm:w-48">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="discount">Best Discount</option>
          </select>
          <button onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden btn-secondary flex items-center gap-2 text-sm">
            <FiFilter /> Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block w-full sm:w-56 shrink-0`}>
            <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100 sticky top-28 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-outfit font-bold text-dark">Filters</h3>
                <button onClick={clearFilters} className="text-xs text-primary-500 hover:underline">Clear All</button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-sm font-semibold text-dark mb-3">Categories</h4>
                <div className="space-y-1.5">
                  <button onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${!selectedCategory ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}>
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors flex items-center gap-2 ${selectedCategory === cat.name ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}>
                      <span>{cat.icon}</span>{cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-sm font-semibold text-dark mb-3">Price Range</h4>
                <div className="space-y-1.5">
                  {priceRanges.map((range, i) => (
                    <button key={i} onClick={() => setSelectedPrice(selectedPrice === i ? null : i)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${selectedPrice === i ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}>
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {filtered.length > 0 ? (
              <ProductGrid products={filtered} columns={3} />
            ) : (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-outfit font-bold text-xl text-dark mb-2">No products found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search or filters.</p>
                <button onClick={clearFilters} className="btn-primary text-sm">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;
