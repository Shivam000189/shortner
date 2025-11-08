const express = require('express');
const User = require('../models/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authmiddler = require('../middleware/authMiddleware')


const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

router.use(express.json());

router.post("/register", async(req, res) => {
    try{
        const {name , email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({msg:"All fields are required"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({msg:"Email already exists"});

        const hasdedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password:hasdedPassword
        })
        res.status(201).json({msg:"User registered successfully"});
    } catch(error){
        console.error("Error during Registeration:", error);
        res.status(500).json({msg:"Server error, please try again later"});
    }
})


router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({msg:"All Fields are Required"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({msg:"Invalid email"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({msg:"Invalid email or password"})
        }

        const token = jwt.sign(
            {userId:user._id, email: user.email},
            SECRET_KEY,
            {expiresIn:'1h'}
        );

        res.status(200).json({msg:"Login Successfuly", token});
    }catch(error){
        console.error('Error during login:', error);
        res.status(500).json({
            msg:"there is something Problem",
        })
    }
})


router.get('/home', authmiddler, (req, res) => {
    res.json({
        msg: `Welcome ${req.user.email}, you are authorized!`,
    })
});


module.exports = router;