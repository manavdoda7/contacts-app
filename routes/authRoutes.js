const router = require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model('User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
router.post('/register', async(req, res)=>{
    console.log('POST /authenticate/register request');
    const {first_name, last_name, email, password} = req.body;
    try {
        let duplicate = await User.find({email})
        console.log(duplicate);
        if(duplicate.length) return res.json({success: false, message: "User already exists."})
        let user = new User();
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        var hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword
        console.log(user, req.body);
        await user.save()
    } catch(err) {
        console.log('Error in saving user. ', err);
        return res.json({success: false, message: 'Please try again after sometime.'})
    }
    res.json({success: true, message: 'User created.'})
})

router.post('/login', async(req, res)=>{
    console.log('POST /authenticate/login request');
    const {email, password} = req.body;
    try {
        let checkUser = await User.find({email})
        if(checkUser.length==0) return res.json({success: false, message: "Login failed."})
        let hashedPassword = checkUser[0].password
        bcrypt.compare(password, hashedPassword, (bcryptErr, result)=>{
            if(bcryptErr) {
                console.log('Bcrypt Error', bcryptErr);
                return res.status(408).json({success:false, error:'Please try again after sometime.'})
            }
            if(result) {
                const token = jwt.sign({
                    id: checkUser[0]._id,
                }, process.env.JWT_SECRET)
                console.log('Auth successful');
                return res.json({success:true, token})
            }
            console.log('Password mismatch');
            return res.json({success:false, message:'Login failed'})
        })
        // console.log(hashedPassword);
    } catch(err) {
        console.log('Error in login. ', err);
        return res.json({success: false, message: 'Please try again after sometime.'})
    }
})

module.exports = router