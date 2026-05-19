import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { useCartUI } from '../../context/CartContext';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CartDrawer = () => {
  const { isCartOpen, closeCart } = useCartUI();
  const { items, count, subtotal, discount, coupon, discountAmount, deliveryFee, total, applyCoupon, removeCoupon, clearCart } = useCart();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/40" onClick={closeCart}>
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="text-primary-500" size={20} />
                <h3 className="font-outfit font-bold text-lg">Cart ({count})</h3>
              </div>
              <div className="flex gap-2">
                {items.length > 0 && (
                  <button onClick={clearCart} className="text-xs text-red-400 hover:text-red-600 transition-colors px-2 py-1">Clear All</button>
                )}
                <button onClick={closeCart} className="p-2 rounded-lg hover:bg-gray-100"><FiX size={18} /></button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-3xl">🛒</div>
                  <p className="text-gray-500 font-medium mb-1">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mb-6">Browse our products and add items</p>
                  <button onClick={() => { closeCart(); navigate('/shop'); }} className="btn-primary text-sm">Browse Products</button>
                </div>
              ) : (
                <div className="space-y-4">{items.map(item => <CartItem key={item.id} item={item} />)}</div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-4 space-y-3">
                {/* Coupon */}
                <div className="flex gap-2">
                  <input type="text" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Coupon code"
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-primary-400" />
                  <button onClick={() => { applyCoupon(couponInput); setCouponInput(''); }}
                    className="px-4 py-2 rounded-xl bg-primary-100 text-primary-600 text-sm font-semibold hover:bg-primary-200 transition-colors">Apply</button>
                </div>
                {coupon && (
                  <div className="flex items-center justify-between bg-green-50 rounded-xl px-3 py-2">
                    <span className="text-green-600 text-xs font-medium">✓ {coupon} applied ({discount}% off)</span>
                    <button onClick={removeCoupon} className="text-red-400 text-xs hover:text-red-600">Remove</button>
                  </div>
                )}

                {/* Summary */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                  {discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discountAmount.toFixed(2)}</span></div>}
                  <div className="flex justify-between text-gray-500"><span>Delivery</span><span>{deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryFee}`}</span></div>
                  <div className="flex justify-between font-bold text-dark text-base pt-2 border-t"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
                </div>

                <motion.button whileHover={{ scale: subtotal >= 200 ? 1.02 : 1 }} whileTap={{ scale: subtotal >= 200 ? 0.98 : 1 }} onClick={() => { closeCart(); navigate('/checkout'); }}
                  disabled={subtotal < 200}
                  className={`w-full text-base ${subtotal >= 200 ? 'btn-primary' : 'bg-gray-300 text-gray-500 rounded-2xl py-3 font-semibold cursor-not-allowed'}`}>
                  {subtotal < 200 ? `Add ₹${(200 - subtotal).toFixed(2)} more to checkout` : 'Proceed to Checkout'}
                </motion.button>
                <p className="text-[10px] text-gray-400 text-center">3km free home delivery • Minimum order ₹200</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
