require('dotenv').config()
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.mgnih.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
require('../models/contact')
require('../models/user')
mongoose.connect(uri, (err)=>{
    if(err) console.log('Error connecting to DB', err);
    else console.log('DB connected')
})
module.exports = mongoose