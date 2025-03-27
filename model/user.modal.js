const mongoose = require('mongoose');
const validator = require('validator');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter your name'],
        trim: true,
        unique:true,
        maxlength: 20,
        minlength:3,

    },
    email:{type:String, required:[true, 'Please enter your email'], trim:true, unique:true,
     validator:[isEmail, 'Please enter a valid email']
        
    },
    password:{
        type:String,
        require:[true, 'Please enter your password'],
        minlength:[6, 'Minimum password length is 6 characters'],
        maxlength:[12, 'Maximum password length is 12 characters']  
    },
    profilePic:{
        type:String,
        default:'https://res.cloudinary.com/dj7k9b6ho/image/upload/v1631773684/avatars/avatar-1_c3c1f5.png',

    },
    address:{
        type:String,
        required:[true, 'Please enter your address'],
        default:'',
        trim:true
    },
    role:{
        type:String,
        enum:['user', 'admin', 'seller'],
        default: 'user'
    }
})

userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            next();
        }
        this.password = await bcrypt.hash(this.password, 12);
        next();
    }
    catch(err){
        console.log(err)
        next(err);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        next(err, false);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;