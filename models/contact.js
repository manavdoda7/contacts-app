const mongoose = require('mongoose')
const { stringify } = require('querystring')

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
    },
    linkedin_url: {
        type: 'String'
    },
    user_id:{
        type: 'ObjectId'
    }
})
mongoose.model("Contact", Contact)