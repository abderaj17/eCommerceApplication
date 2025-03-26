const mongoose = require('mongoose');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter your name'],
        trim: true,
        unique:true,

    },
    email:{type:String, required:[true, 'Please enter your email'], trim:true, unique:true,
     validator:[isEmail, 'Please enter a valid email']
        
    },
    password:{
        type:String,
        require:[true, 'Please enter your password'],
        minlength:[6, 'Minimum password length is 6 characters']
        
    },
    profilePic:{},
    address:{},
    role:{}
})