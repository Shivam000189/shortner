const express = require('express');
const authmiddler = require('../middleware/authMiddleware');
const URl = require('../models/Url');


const router = express.Router();

router.use(express.json());
router.use(authmiddler);

router.post('/', async (req, res) => {
    try{
        const {originalUrl, shortCode, shortUrl, click} = req.body;
        if(!originalUrl || !shortCode || !click){
            return res.status(400).json({msg:"Fields are required"});
        }

        const newURL = await URL.createObjectURL({
            originalUrl,
            shortCode,
            shortUrl,
            click,
        });
        return res.status(201).json({msg:"Url "})
    }
})