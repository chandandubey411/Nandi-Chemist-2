export const formatPrice = (price) => `₹${price.toFixed(2)}`;
export const truncateText = (text, maxLength = 60) => text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
export const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
export const calculateDiscountedPrice = (price, discount) => Math.round(price - (price * discount) / 100);
export const generateRatingArray = (rating) => Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? 'full' : i < rating ? 'half' : 'empty');
export const groupBy = (array, key) => array.reduce((result, item) => ({ ...result, [item[key]]: [...(result[item[key]] || []), item] }), {});
export const ROUTES = { HOME: '/', SHOP: '/shop', PRODUCT: '/product/:id', CART: '/cart', CHECKOUT: '/checkout', ORDERS: '/orders', ABOUT: '/about', CONTACT: '/contact' };
