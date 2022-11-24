const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
require('dotenv').config()

const checkAuth = async(req, res, next) => {
    let token
    try {
        token = req.headers.authorization.split(" ")[1]
    } catch(err) {
        return res.json({success:false, error:"token not found"})
    }
    // console.log(token);
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        let user = await User.findById(decode.id)
        req.userData = user._id
        if(user==undefined) return res.json({success: false, message: 'You\'re not authorised.'})
        next()
    } catch(err) {
        console.log('JWT Token verification failed.', err);
        return res.json({success: false, message: "Please try again after sometime."})
    }
}
module.exports = checkAuth