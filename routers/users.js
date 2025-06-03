const {user, User} = require('../models/user');
const express =require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get(`/`, async (req,res)=>{
    const userList = await User.find();

    if(!userList){
        res.status(500).json({
            success: false
        })
    }
    res.send(userList);
})

router.post('/register', async(req, res)=>{
    
    const {FirstName, Lastname, Email, Phone, Birthdate, Password} = req.body;
                
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new User({
        Firstname,
        LastName,
        Email,
        Phone,
        Birthdate,
        Password: hashedPassword
        });

    await newUser.save()
        .then((newUser) => {
        res.status(201).json(newUser)
        })
        .catch((err) => {
        res.status(500).json({
        error: err,
        success: false,
        })
    })
})

module.exports = router;