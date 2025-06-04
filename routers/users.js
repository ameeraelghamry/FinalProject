const User = require('../models/user');
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


//sign up
router.post(`/`, async(req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.Password, 10);

    const newUser = new User({
        FirstName:  req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Birthdate: req.body.Birthdate,
        Password: hashedPassword
    })

    //save in database
    await newUser
        .save()
        .then((created) => {
            res.status(201).json(created)
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            })
        })
})

module.exports = router;