import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '../contexts/CartContext';
import CartPage from './CartPage';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
