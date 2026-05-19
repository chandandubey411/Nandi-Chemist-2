import { FiTrash2 } from 'react-icons/fi';
import QuantitySelector from '../ui/QuantitySelector';
import { useCart } from '../../hooks/useCart';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  return (
    <div className="flex gap-3 bg-gray-50 rounded-2xl p-3">
      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-dark truncate">{item.name}</h4>
        <p className="text-xs text-gray-400">{item.category}</p>
        <div className="flex items-center justify-between mt-2">
          <QuantitySelector quantity={item.quantity} onChange={(q) => updateQuantity(item.id, q)} />
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-dark">₹{(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors p-1">
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
