const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  shortUrl: { type: String },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false } // optional now
});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
