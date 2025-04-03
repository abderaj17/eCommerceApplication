const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, clearCart } = require('../controllers/cart.controller');
const cartController = require('../controller/cart.controller');
const authMiddleware = require('../auth/middleware.auth');

router.use(authMiddleware.verifyToken);

router.get('/', cartController.getCart);

router.post('/items', cartController.addToCart);

router.delete('/items/:itemId', cartController.removeFromCart);

router.delete('/', cartController.clearCart);

module.exports = router;
