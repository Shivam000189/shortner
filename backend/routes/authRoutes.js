const express = require('express');

const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

router.use(express.json());

router.post("/register", async(req, res) => {
    
})
