const User = require('../models/user');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try{
        const userList = await User.find();
       
        if(!userList){
            return res.status(500).json({success: false});
        }
        res.send(userList)
    }catch(err){
        res.status(500).json({success: false, error: err});
    }
};


const createUser = async (req, res) => {

    const { FirstName, LastName, Email, Phone, Birthdate, Password, ConfirmPassword } = req.body;

    //same password is entered
    if (req.body.Password !== req.body.ConfirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
    }

    //validation that user has not registered before
    const duplicate = await User.findOne({Email});
    if(duplicate){
        return res.status(400).json({message: "Email already registered."});
    }
    
    //one way encryption for password
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    
    const newUser = new User({
        FirstName,
        LastName,
        Email,
        Phone,
        Birthdate,
        Password: hashedPassword
    })
    
        //save in database
    await newUser
        .save()
        .then((created) => {

            req.session.user = created; //session established as user registers

            res.status(201).json(created)
        })
        .catch((err) => {
        res.status(500).json({
        error: err,
        success: false,
        })
    })
}

module.exports = {
    getAllUsers,
    createUser,
};