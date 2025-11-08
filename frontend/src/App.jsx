import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/cart`);
      setCart(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(`${API_URL}/cart`, { productId, quantity: 1 });
      fetchCart(); 
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await axios.delete(`${API_URL}/cart/${cartItemId}`);
      fetchCart(); 
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  const handleCheckoutComplete = () => {
    fetchCart(); 
  };

  return (
    <div className="min-h-screen font-sans antialiased">
      <Header cartCount={cart.items.length} />
      {/* 👇 UPDATE THIS SECTION 👇 */}
      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/"
            element={<ProductList onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                onCheckoutComplete={handleCheckoutComplete}
                apiUrl={API_URL}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;