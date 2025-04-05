// frontend/ecommerce/src/components/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import CartPage from './CartPage';
import AddToCartButton from './AddToCartButton';
import CartIcon from './CartIcon';


// Configure backend connection
axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/cart', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setCart(response.data.items || []);
    } catch (error) {
      console.error('Cart fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  return (
    <Router>
      <div className="app">
        <header>
          <Link to="/" className="logo">My Shop</Link>
          <Link to="/cart">
            <CartIcon itemCount={cart.length} />
          </Link>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <div className="product-page">
                <h2>Featured Product</h2>
                <div className="product-card">
                  <AddToCartButton 
                    productId="prod_sample123" 
                    onAdd={fetchCart} 
                  />
                </div>
              </div>
            } />
            
            <Route path="/cart" element={
              loading ? <p>Loading...</p> : <CartPage cartItems={cart} onItemRemove={fetchCart} />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;