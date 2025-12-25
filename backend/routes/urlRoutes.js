const express = require('express');
const { nanoid } = require('nanoid');
const Url = require('../models/Url');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
router.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;


function getUserFromToken(req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (err) {
        return null; 
    }
}


router.post('/shorten', async (req, res) => {
    try {
        const { originalUrl } = req.body;

        
        if (!originalUrl) {
            return res.status(400).json({ msg: 'Original URL is required' });
        }

        
        try {
            new URL(originalUrl);
        } catch (err) {
            return res.status(400).json({ msg: 'Invalid URL format. Please provide a valid URL with protocol (http:// or https://)' });
        }

        
        const shortCode = nanoid(6);

        
        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
        // const baseUrl = `${req.protocol}://${req.get('host')}`;
        const shortUrl = `${baseUrl.replace(/\/$/, '')}/${shortCode}`;

        
        const user = getUserFromToken(req);

        
        const newUrl = await Url.create({
            originalUrl,
            shortCode,
            shortUrl,
            clicks: 0,
            createdAt: new Date(),
            userId: user ? user.userId : null,
        });

        
        res.status(201).json({
            msg: 'URL shortened successfully',
            shortUrl: newUrl.shortUrl,
            shortCode: newUrl.shortCode,
        });
    } catch (error) {
        console.error('Error while shortening URL:', error);
        res.status(500).json({ msg: 'Server error, please try again later' });
    }
});

module.exports = router;
