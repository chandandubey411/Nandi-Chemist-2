import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [] },
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.items.find(i => i.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    toggleWishlist: (state, action) => {
      const idx = state.items.findIndex(i => i.id === action.payload.id);
      if (idx >= 0) state.items.splice(idx, 1);
      else state.items.push(action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsWishlisted = (id) => (state) => state.wishlist.items.some(i => i.id === id);
export default wishlistSlice.reducer;
