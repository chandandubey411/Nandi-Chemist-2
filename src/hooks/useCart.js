import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon, removeCoupon, selectCartItems, selectCartCount, selectCartSubtotal, selectCartDiscount, selectCoupon } from '../redux/slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectCartDiscount);
  const coupon = useSelector(selectCoupon);
  const discountAmount = (subtotal * discount) / 100;
  const deliveryFee = 0; // Free home delivery within 3km
  const total = subtotal - discountAmount + deliveryFee;

  return {
    items, count, subtotal, discount, coupon, discountAmount, deliveryFee, total,
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    updateQuantity: (id, quantity) => dispatch(updateQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
    applyCoupon: (code) => dispatch(applyCoupon(code)),
    removeCoupon: () => dispatch(removeCoupon()),
  };
};
