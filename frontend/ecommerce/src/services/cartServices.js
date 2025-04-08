import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart';

// Set auth token for requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Get user's cart
export const getCart = async () => {
  const token = localStorage.getItem('token');
  setAuthToken(token);
  return await axios.get(API_URL);
};

// Remove item from cart
export const removeFromCart = async (itemId) => {
  const token = localStorage.getItem('token');
  setAuthToken(token);
  return await axios.delete(`${API_URL}/items/${itemId}`);
};

// Clear cart
export const clearCart = async () => {
  const token = localStorage.getItem('token');
  setAuthToken(token);
  return await axios.delete(API_URL);
};
