import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    coupon: null,
    discount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      state.discount = 0;
    },
    applyCoupon: (state, action) => {
      const coupons = { SAVE10: 10, HEALTH20: 20, NANDI15: 15 };
      const code = action.payload.toUpperCase();
      if (coupons[code]) {
        state.coupon = code;
        state.discount = coupons[code];
      }
    },
    removeCoupon: (state) => {
      state.coupon = null;
      state.discount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon, removeCoupon } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const selectCartDiscount = (state) => state.cart.discount;
export const selectCoupon = (state) => state.cart.coupon;

export default cartSlice.reducer;
