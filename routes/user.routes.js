const router = require('express').Router();
const User = require('../model/user.model');
const {getUsers} = require('../controller/user.controller');

router.get('/getUserDetails/:id', getUsers);

router.post('/login', async (req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({message: 'Please provide email and password'});
        }

        const user = await User.findOne({email});
        console.log(user);

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        if(!(await user.comparePassword(password))){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        res.status(200).json({mesaage: 'Login Successful', user});
    }catch(error){
        res.status(500).json({message: 'Internal Server Error'});
    }
});

router.post('/register', async (req, res)=>{
    try{
        const user = new User(req.body);
        const result = await user.save();

        res.status(201).json({message: 'User registered successfully', user: result});
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
})