const mongoose = require('mongoose');
const { trim } = require('validator');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter product name'],
        trim: true,
    },
    price:{
        type:Number,
        required:[true, 'Please enter product price'],
        trim: true,
    },
    imageUrl:{
        type:String,
        required:[true, 'Please enter product image'],
        trim: true,
    },
    desciption:{
        type:String,
        required:[true, 'Please enter product description'],
        trim: true,
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },

})

