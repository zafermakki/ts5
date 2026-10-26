import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ProductsProvider } from './context/ProductsContext.jsx';

export default function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <div className="app-shell">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ProductsProvider>
  );
}