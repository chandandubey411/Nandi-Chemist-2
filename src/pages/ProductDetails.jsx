import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiShoppingCart, FiHeart, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { products } from '../data/products';
import RatingStars from '../components/ui/RatingStars';
import Badge from '../components/common/Badge';
import QuantitySelector from '../components/ui/QuantitySelector';
import ProductSlider from '../components/products/ProductSlider';
import SectionTitle from '../components/common/SectionTitle';
import { useCart } from '../hooks/useCart';
import { useCartUI } from '../context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, selectIsWishlisted } from '../redux/slices/wishlistSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  const { openCart } = useCartUI();
  const dispatch = useDispatch();
  const isWishlisted = product ? useSelector(selectIsWishlisted(product.id)) : false;
  const relatedProducts = product ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6) : [];

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <h2 className="text-2xl font-outfit font-bold mb-2">Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="btn-primary text-sm mt-4">Back to Shop</button>
      </div>
    </div>
  );

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    openCart();
  };

  const tabs = [
    { key: 'description', label: 'Description' },
    { key: 'dosage', label: 'Dosage & Usage' },
    { key: 'sideEffects', label: 'Side Effects' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50/50 pt-28 pb-16">
      <div className="container-max px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-6 transition-colors">
          <FiArrowLeft /> Back
        </button>

        <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative bg-gray-50 rounded-2xl p-8 flex items-center justify-center min-h-[350px]">
              <div className="absolute top-4 left-4 flex flex-col gap-1">
                {product.discount > 0 && <Badge type="discount">-{product.discount}% OFF</Badge>}
                {product.isNew && <Badge type="new">NEW</Badge>}
                {product.isBestseller && <Badge type="bestseller">BESTSELLER</Badge>}
              </div>
              <img src={product.image} alt={product.name} className="max-h-72 object-contain" />
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
              <span className="text-xs text-primary-500 font-semibold uppercase tracking-wider mb-1">{product.category} • {product.subCategory}</span>
              <h1 className="text-2xl md:text-3xl font-outfit font-bold text-dark mb-3">{product.name}</h1>
              <p className="text-xs text-gray-400 mb-3">By {product.manufacturer}</p>
              <RatingStars rating={product.rating} reviews={product.reviews} size="md" />

              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-bold text-dark">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                    <span className="text-sm font-bold text-green-600">Save ₹{product.originalPrice - product.price}</span>
                  </>
                )}
              </div>

              <p className="text-gray-500 text-sm mt-4 leading-relaxed">{product.description}</p>

              <div className="flex items-center gap-4 mt-6">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleAddToCart}
                  className="flex-1 btn-primary flex items-center justify-center gap-2">
                  <FiShoppingCart /> Add to Cart
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => dispatch(toggleWishlist(product))}
                  className="w-12 h-12 rounded-2xl border-2 border-gray-200 flex items-center justify-center hover:border-red-300 transition-colors">
                  {isWishlisted ? <FaHeart className="text-red-500" /> : <FiHeart className="text-gray-400" />}
                </motion.button>
              </div>

              <div className="flex gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-400"><FiTruck className="text-green-500" /> 3km free home delivery • Min order ₹200</div>
                <div className="flex items-center gap-2 text-xs text-gray-400"><FiShield className="text-blue-500" /> 100% Authentic</div>
              </div>

              {product.stock < 50 && (
                <p className="text-xs text-orange-500 mt-3">⚠️ Only {product.stock} left in stock!</p>
              )}
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-100 px-6 md:px-8 py-6">
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
              {tabs.map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-white text-dark shadow-sm' : 'text-gray-500 hover:text-dark'}`}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="text-gray-600 text-sm leading-relaxed">
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'dosage' && <p><strong>Dosage:</strong> {product.dosage}</p>}
              {activeTab === 'sideEffects' && <p><strong>Side Effects:</strong> {product.sideEffects}</p>}
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <SectionTitle subtitle="You may also like" title="Related Products" />
            <ProductSlider products={relatedProducts} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetails;
