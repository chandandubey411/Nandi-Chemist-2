import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/*" element={<AppRoutes />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
