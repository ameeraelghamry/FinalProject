const User = require('../models/user'); // import the user model 
const bcrypt = require('bcrypt');

//signup 
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

//signing up a new user 

const createUser = async (req, res) => {
    console.log("REQ BODY:", req.body);//for testing

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

    const validbDate = Birthdate.split('T')[0];
    
    const newUser = new User({
        FirstName,
        LastName,
        Email,
        Phone,
        Birthdate: validbDate,
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
    loginUser, //login 
};

// jomana login 

const loginUser = async (req, res) => {
    const { Email, Password } = req.body; // Extract email and pass from the request body

    try {
     // Step 1: Check if the user email exists
        const user = await User.findOne({ Email });

        // if the user isnt found suggesting to sign up
        if (!user) {
            return res.status(401).json({ message: "User not found. Please signup/Register. " }); // 401 Unauthorized
        }

    // Step 2: Validate password by comparing the provided pass with the hashed one in the db
        const isMatch = await bcrypt.compare(Password, user.Password);

         // if the email isnt found suggesting try again or use forgot pass page 
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password. Try again or reset your password. " });
        }

    // Step 3: Save the user session
        req.session.user = user;

     // Step 4: Check the user's type from the database

        if (user.Type === 'admin') {
            return res.status(200).json({
                success: true,
                message: "Admin login successful",
                redirectTo: "/admin" // Redirect to admin dashboard "change link"
            });

        } else if (user.Type === 'client') {
            return res.status(200).json({
                success: true,
                message: "Client login successful",
                redirectTo: "/home" // Redirect to client home page"check link"
            });
        } 
        else {
            // handle unknown type "client/admin"
            return res.status(400).json({ message: "Invalid user type" });
        }
    } 
    
    catch (err) {
 // Step 5: Handle unexpected errors
        return res.status(500).json({ message: "Server error", error: err });
    }
};