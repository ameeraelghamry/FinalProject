const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    FirstName:  {
        type: String,
        required: true,
    },
    LastName:  {
        type: String,
        required: true,
    },
    Email: {
        type: String, //for email and passwords, string can handle the special characters
        required: true, 
    },
    Phone: {
        type: Number,
        required: true,
    },
    Birthdate: {
        type: String,
        required: true,
    },
    Password:  {
        type: String,
        required: true,
    },
    Type: {
        type: String,
        enum: ['client','admin'],  //because we have two options a client/user and an admin to use in login 
        default: 'client',
     },
})

//exporting product itself
module.exports = mongoose.model('User', userSchema);