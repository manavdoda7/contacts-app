const mongoose = require('mongoose')

var Contact = new mongoose.Schema({
    first_name:{
        type:'String'
    },
    last_name:{
        type:'String'
    },
    email:{
        type:'String'
    },
    phone_number:{
        type:'String'
    }
})
mongoose.model("Contact", Contact)