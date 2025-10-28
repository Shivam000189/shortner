const express = require('express');
require('./config/db');

const app = express();
const PORT = 3001; 


app.get('/', (req, res) => {
    res.send("welcome to URL Shortner API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});