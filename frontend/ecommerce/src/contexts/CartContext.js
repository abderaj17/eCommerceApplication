import React, { createContext, useState, useEffect } from 'react';
import { getCart, removeFromCart, addToCart, clearCart } from '../services/cartServices';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const { data } = await getCart();
      setCart(data.cart);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, quantity) => {
    try {
      await addToCart(productId, quantity);
      await fetchCart(); // refresh cart
    } catch (err) {
      console.error('Failed to add item', err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove item', error);
    }
  };

  const emptyCart = async () => {
    try {
      await clearCart();
      setCart(null);
    } catch (err) {
      console.error('Failed to clear cart', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItem,
        removeItem,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
