const Cart = require('../model/cart.model');
const Product = require('../model/product.model');


exports.getCart = async (req, res)=>{
 try{
    let cart = await Cart.findOne({ user: req.user.id}).populate('items.product');

    if(!cart){
        cart = await Cart.create({ user: req.user.id, items: []});
    }

    res.status(200).json({
        success: true,
        cart
    });
 }catch(err){
    res.status(500).json({
        success: false,
        message: 'Error fetching cart',
        error: err.message
    });
 }
};

