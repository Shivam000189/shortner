const mongoose = require('mongoose');


const urlSchema = new  mongoose.Schema({
    originalUrl: {type: String, required:true},
    shortCode: {type:Number},
    shortUrl: {type:String},
    click: {type:Number},
    createAt : {type:Date}
})


const Url = new mongoose.Schema('Url', urlSchema);
module.exports = Url;