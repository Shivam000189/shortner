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
app.use('/', urlRoutes);



app.get('/', (req, res) => {
    res.send("welcome to URL Shortner API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});