require('dotenv').config(); 

const express = require('express');
const mongoose = require('./config/db');   
const urlRoutes = require('./routes/urlRoutes');
const redirectController = require('./controllers/redirectController');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
const cors = require('cors');
app.use(cors());


app.use('/url', urlRoutes);


app.get('/', (req, res) => {
    res.send("URL Shortener API is running...");
});


app.get('/:shortCode', redirectController);


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
