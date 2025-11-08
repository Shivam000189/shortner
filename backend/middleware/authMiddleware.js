const jwt = require('jsonwebtoken');
require('dotenv').config();


const SECRET_KEY = process.env.SECRET_KEY;


function authmiddler(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({msg: "Access denied. No token provided. "});
    }

    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch(error){
        return res.status(403).json({msg:"Invalid and expired token "});
    }
}

module.exports = authmiddler;



