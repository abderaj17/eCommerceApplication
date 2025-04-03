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

exports.addToCart = async (req, res) => {
    try {
        const {productId, quantity = 1} = req.body;

        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        let cart = await Cart.findOne({ user: req.user.id});

        if(!cart){
            cart = new Cart({user: req.user.id, items:[]});
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if(existingItem){
            existingItem.quantity += quantity;
        }else{
            cart.items.push({ product:productId, quantity});
        }

        await cart.save();

        res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding to cart',
            error: error.message
        })
    }
};

exports.removeFromCart = async (req, res) =>{
    try{
        const { itemId } = req.params;

        const cart = await Cart.findOneAndUpdate(
            {user: req.user.id},
            {$pull: {items:{_id:itemId}}},
            {new: true}
        ).populate('items.product');

        if(!cart){
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }
        res.status(200).json({
            success: true,
            cart
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error removing item form cart',
            error:error.message
        })
    }
};

exports.clearCart = async (req, res) => {
    
}