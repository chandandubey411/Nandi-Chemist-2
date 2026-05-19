import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/common/Loader';

const Home = lazy(() => import('../pages/Home'));
const Shop = lazy(() => import('../pages/Shop'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader /></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
