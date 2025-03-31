const jwt = require('jsonwebtoken');

const user = require('../model/user.modal');

const auth  = async (req, res, next) =>{
    try{
        const token = req.headers.authorization.replace('Bearer', '');

        if(!token){
            return res.status(401).json({message: 'Unauthorized user' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
        next();
    }
    catch(err){
        res.status(500).json({message: 'Internal Server Error', error: err.message});
    }
}

const createToken = async (user) =>{
    try{
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1hr"});

        return token;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {auth, createToken};