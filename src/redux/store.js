import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';

const loadState = () => {
  try {
    const serialized = localStorage.getItem('nandiChemistState');
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) { return undefined; }
};

const saveState = (state) => {
  try {
    localStorage.setItem('nandiChemistState', JSON.stringify(state));
  } catch (e) {}
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({ cart: store.getState().cart, wishlist: store.getState().wishlist });
});

export default store;
