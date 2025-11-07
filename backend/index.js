const express = require('express');
const bodyParser = require('body-parser');
require('./config/db');
const authRoutes = require('./routes/authRoutes')
const jwt = require('jsonwebtoken');



const app = express();
const PORT = process.env.PORT || 3001; 
const SECRET_KEY = process.env.SECRET_KEY;

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use('/auth', authRoutes);



app.get('/', (req, res) => {
    res.send("welcome to URL Shortner API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});