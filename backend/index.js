const express = require('express');
const bodyParser = require('body-parser');
require('./config/db');
const authRoutes = require('./routes/authRoutes')
const jwt = require('jsonwebtoken');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 3000; 
const SECRET_KEY = process.env.SECRET_KEY;

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/', authRoutes);

const urlRoutes = require('./routes/urlRoutes');
const Url = require('./models/Url');
app.use('/', urlRoutes);



app.get('/', (req, res) => {
    res.send("welcome to URL Shortner API");
});

app.get(':/shortCode', async (req, res) => {
    try{
       const {shortCode} = req.params;
       
       const url = await Url.findOne({shortCode});

       if(!url) {
        return res.status(404).json({msg:"Short URL not found"});
       }
       url.clicks += 1;
       await url.save();

       return res.redirect(url.originalUrl);
    } catch(error){
        console.error('Redirect Error:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});