import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import Input from '../components/common/Input';
import { FiCreditCard, FiSmartphone, FiDollarSign, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const WHATSAPP_NUMBER = '919871200232'; // Change to your real WhatsApp number
const SHOP_EMAIL = 'support@nandichemist.com'; // Change to your real email

const Checkout = () => {
  const { items, subtotal, discountAmount, deliveryFee, total, clearCart, coupon, discount } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', pincode: '', state: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const isFormValid = Object.values(form).every(val => val.trim() !== '');

  const handleNextStep = () => {
    if (!isFormValid) {
      alert('Please fill in all the required delivery details.');
      return;
    }
    setStep(2);
  };

  const buildOrderMessage = () => {
    const orderId = 'NC-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    const itemsList = items.map((item, i) =>
      `${i + 1}. ${item.name} x${item.quantity} — ₹${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const message = `🧾 *NEW ORDER — ${orderId}*
━━━━━━━━━━━━━━━━━

📦 *Order Items:*
${itemsList}

💰 *Payment Summary:*
Subtotal: ₹${subtotal.toFixed(2)}${coupon ? `\nCoupon (${coupon}): -${discount}%` : ''}${discountAmount > 0 ? `\nDiscount: -₹${discountAmount.toFixed(2)}` : ''}
Delivery: ${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}
*Total: ₹${total.toFixed(2)}*

🚚 *Delivery Details:*
Name: ${form.name || 'N/A'}
Phone: ${form.phone || 'N/A'}
Email: ${form.email || 'N/A'}
Address: ${form.address || 'N/A'}
City: ${form.city || 'N/A'} - ${form.pincode || 'N/A'}
State: ${form.state || 'N/A'}

━━━━━━━━━━━━━━━━━
Thank you for ordering from NandiChemist! 💊`;

    return { message, orderId };
  };

  const sendToWhatsApp = (message) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  const sendToEmail = (message, orderId) => {
    const subject = encodeURIComponent(`New Order ${orderId} — NandiChemist`);
    const body = encodeURIComponent(message);
    window.open(`mailto:${SHOP_EMAIL}?subject=${subject}&body=${body}`, '_blank');
  };

  const handlePlaceOrder = () => {
    const { message, orderId } = buildOrderMessage();

    // Send to WhatsApp
    sendToWhatsApp(message);

    // Send to Email (slight delay so both windows open)
    setTimeout(() => {
      sendToEmail(message, orderId);
    }, 500);

    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
          className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <FiCheck className="text-green-600" size={40} />
        </motion.div>
        <h2 className="text-3xl font-outfit font-bold text-dark mb-2">Order Placed! 🎉</h2>
        <p className="text-gray-400 mb-2">Your order details have been sent via WhatsApp & Email.</p>
        <p className="text-gray-400 text-sm mb-6">We'll confirm your order shortly!</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate('/shop')} className="btn-primary text-sm">Continue Shopping</button>
          <button onClick={() => navigate('/')} className="btn-secondary text-sm">Go Home</button>
        </div>
      </div>
    </motion.div>
  );

  if (items.length === 0 || subtotal < 300) {
    navigate('/cart');
    return null;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50/50 pt-28 pb-16">
      <div className="container-max px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-6"><FiArrowLeft /> Back</button>

        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {['Delivery', 'Review'].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-gradient-to-r from-primary-500 to-cyan-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                {step > i + 1 ? <FiCheck size={14} /> : i + 1}
              </div>
              <span className={`text-sm font-medium ${step >= i + 1 ? 'text-dark' : 'text-gray-400'}`}>{s}</span>
              {i < 1 && <div className={`w-12 h-0.5 ${step > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl shadow-card border border-gray-100 p-6">
                <h3 className="font-outfit font-bold text-lg mb-6">Delivery Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full Name *" value={form.name} onChange={(e) => updateForm('name', e.target.value)} placeholder="John Doe" />
                  <Input label="Phone Number *" value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} placeholder="+91 98765 43210" />
                  <Input label="Email *" value={form.email} onChange={(e) => updateForm('email', e.target.value)} placeholder="john@example.com" className="sm:col-span-2" />
                  <Input label="Address *" value={form.address} onChange={(e) => updateForm('address', e.target.value)} placeholder="Street address" className="sm:col-span-2" />
                  <Input label="City *" value={form.city} onChange={(e) => updateForm('city', e.target.value)} placeholder="Noida" />
                  <Input label="PIN Code *" value={form.pincode} onChange={(e) => updateForm('pincode', e.target.value)} placeholder="201301" />
                  <Input label="State *" value={form.state} onChange={(e) => updateForm('state', e.target.value)} placeholder="Uttar Pradesh" />
                </div>
                <button onClick={handleNextStep} className={`btn-primary mt-6 ${!isFormValid ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none' : ''}`}>Continue to Order</button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl shadow-card border border-gray-100 p-6">
                <h3 className="font-outfit font-bold text-lg mb-6">Order Review</h3>
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1"><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-gray-400">Qty: {item.quantity}</p></div>
                      <p className="font-bold text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mb-4">
                  <p className="text-sm text-gray-500 mb-1"><strong>Deliver to:</strong> {form.name || 'N/A'}</p>
                  <p className="text-sm text-gray-400">{form.address} {form.city} {form.pincode}</p>
                </div>

                {/* Order Info */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaWhatsapp className="text-green-600" size={18} />
                    <p className="text-sm font-semibold text-green-700">Order via WhatsApp & Email</p>
                  </div>
                  <p className="text-xs text-green-600">Your order details will be sent to our WhatsApp and email for quick confirmation.</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                  <button onClick={handlePlaceOrder}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-2xl px-6 py-3 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                    <FaWhatsapp size={18} /> Continue to Order — ₹{total.toFixed(2)}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6 h-fit sticky top-28">
            <h3 className="font-outfit font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500"><span>Items ({items.length})</span><span>₹{subtotal.toFixed(2)}</span></div>
              {discountAmount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discountAmount.toFixed(2)}</span></div>}
              <div className="flex justify-between text-gray-500"><span>Delivery</span><span>{deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryFee}`}</span></div>
              <div className="flex justify-between font-bold text-dark text-lg pt-3 border-t"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
