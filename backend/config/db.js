const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/urlShortener")
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

module.exports = mongoose


