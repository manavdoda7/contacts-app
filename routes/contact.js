const checkAuth = require('../middlewares/checkAuth')
const mongoose = require('mongoose')
const { query } = require('express')
const Contact = mongoose.model('Contact')
const router = require('express').Router()

router.get('/', checkAuth, async(req, res)=>{
    console.log('GET /contact request');
    let where = req.query
    if(where._id) where._id = `${where._id}`
    try {
        console.log(req.userData);
        // req.userData = req.userData.toString()
        let contacts = await Contact.find({user_id: `${req.userData}`, ...where})
        return res.json({success: true, contacts})
    } catch(err) {
        console.log('Error in fetching contacts.', err);
        return res.json({success: false, message: 'Please try again after sometime.'})
    }
})

router.post('/', checkAuth, async(req, res)=>{
    console.log('POST /contact request');
    const {contacts} = req.body
    try {
        for(let i=0;i<contacts.length;i++) {
            contacts[i].user_id = req.userData
        }
        await Contact.insertMany(contacts);
    } catch(err) {
        console.log('Error in saving contact.', err);
        return res.json({success: false, message: 'Please try again after sometime.'})
    }
    return res.json({success: true, message: "Saved successfully."})
})

router.patch('/', checkAuth, async(req, res)=>{
    let {first_name, last_name, email, phone_number, linkedin_url} = req.body
    let _id = req.query._id
    console.log('PATCH /contact request');
    try {
        let contact = await Contact.findById(_id);
        // console.log(`${contact.user_id}`==req.userData);
        // console.log(contact.user_id.substring, req.userData);
        if((contact==undefined) || (`${contact.user_id}` != req.userData)) return res.json({success: false, message: 'Contact doesn\'t exist.'})
        contact.first_name = first_name;
        contact.last_name = last_name;
        contact.email = email;
        contact.phone_number = phone_number;
        contact.linkedin_url = linkedin_url;
        await contact.save()
        return res.json({success: true, message:'Details updated'})
    } catch(err) {
        console.log('Error in updating contact.', err);
        return res.json({success: false, message: 'Please try again after sometime.'})
    }
})

router.delete('/', checkAuth, async(req, res)=>{
    const _id = req.query
    console.log('DELETE /contact request');
    try {
        let contact = await Contact.findById(_id);
        if(contact==undefined || `${contact.user_id}` != req.userData) return res.json({success: false, message: 'Contact doesn\'t exist.'})
        contact.deleteOne({_id});
        return res.json({success: true, message: 'Delete success.'})
    } catch(err) {
        console.log('Error in deletion', err);
        return res.json({success: false, message: 'Please try again after sometime.'})
    }
})

module.exports = router