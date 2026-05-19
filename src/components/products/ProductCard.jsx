import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Badge from '../common/Badge';
import RatingStars from '../ui/RatingStars';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';
import { useCartUI } from '../../context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, selectIsWishlisted } from '../../redux/slices/wishlistSlice';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { openCart } = useCartUI();
  const dispatch = useDispatch();
  const isWishlisted = useSelector(selectIsWishlisted(product.id));
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="product-card cursor-pointer group relative"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.discount > 0 && <Badge type="discount">-{product.discount}% OFF</Badge>}
        {product.isNew && <Badge type="new">NEW</Badge>}
        {product.isBestseller && <Badge type="bestseller">BESTSELLER</Badge>}
      </div>

      {/* Wishlist */}
      <button onClick={(e) => { e.stopPropagation(); dispatch(toggleWishlist(product)); }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
        {isWishlisted ? <FaHeart className="text-red-500" size={14} /> : <FiHeart size={14} className="text-gray-400" />}
      </button>

      {/* Image */}
      <div className="relative overflow-hidden rounded-t-3xl bg-gray-50 p-4 h-48 flex items-center justify-center">
        <img src={product.image} alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" />
      </div>

      {/* Details */}
      <div className="p-4">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{product.category} • {product.manufacturer}</p>
        <h3 className="font-semibold text-dark text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <RatingStars rating={product.rating} reviews={product.reviews} />

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-dark">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </div>

        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleAddToCart}
          className="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-cyan-500 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-glow transition-shadow">
          <FiShoppingCart size={14} /> Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
