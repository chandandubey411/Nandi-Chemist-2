import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import SectionTitle from '../components/common/SectionTitle';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { useState } from 'react';

const Cart = () => {
  const { items, count, subtotal, discount, coupon, discountAmount, deliveryFee, total, applyCoupon, removeCoupon, clearCart } = useCart();
  const [couponInput, setCouponInput] = useState('');

  if (items.length === 0) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6 text-4xl">🛒</div>
        <h2 className="text-2xl font-outfit font-bold text-dark mb-2">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-6">Browse our products and add items to your cart.</p>
        <Link to="/shop" className="btn-primary inline-flex items-center gap-2"><FiShoppingBag /> Browse Products</Link>
      </div>
    </motion.div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50/50 pt-28 pb-16">
      <div className="container-max px-4">
        <SectionTitle title={`Shopping Cart (${count} items)`} subtitle="Your Cart" align="left" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <Link to="/shop" className="text-sm text-primary-600 flex items-center gap-1 hover:underline"><FiArrowLeft /> Continue Shopping</Link>
              <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600">Clear Cart</button>
            </div>
            {items.map(item => <CartItem key={item.id} item={item} />)}
          </div>

          <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6 h-fit sticky top-28">
            <h3 className="font-outfit font-bold text-lg mb-4">Order Summary</h3>
            <div className="flex gap-2 mb-4">
              <input type="text" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Coupon code"
                className="flex-1 input-field text-sm" />
              <button onClick={() => { applyCoupon(couponInput); setCouponInput(''); }}
                className="px-4 py-2 rounded-xl bg-primary-100 text-primary-600 text-sm font-semibold">Apply</button>
            </div>
            {coupon && (
              <div className="flex items-center justify-between bg-green-50 rounded-xl px-3 py-2 mb-4">
                <span className="text-green-600 text-xs font-medium">✓ {coupon} ({discount}% off)</span>
                <button onClick={removeCoupon} className="text-red-400 text-xs">Remove</button>
              </div>
            )}
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              {discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discountAmount.toFixed(2)}</span></div>}
              <div className="flex justify-between text-gray-500"><span>Delivery</span><span>{deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryFee}`}</span></div>
              <div className="flex justify-between font-bold text-dark text-lg pt-3 border-t"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
            </div>
            {subtotal >= 300 ? (
              <Link to="/checkout" className="block w-full btn-primary text-center mt-4">Proceed to Checkout</Link>
            ) : (
              <button disabled className="w-full bg-gray-300 text-gray-500 rounded-2xl py-3 font-semibold cursor-not-allowed mt-4 text-center">
                Add ₹{(300 - subtotal).toFixed(2)} more to checkout
              </button>
            )}
            <p className="text-[10px] text-gray-400 text-center mt-2">3km free home delivery • Minimum order ₹300</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
