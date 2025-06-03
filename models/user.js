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
        type: Date,
        required: true,
    },
    Password:  {
        type: String,
        required: true,
    },
    Type: {
        type: String,
        default: 'client',
     },
})

//exporting product itself
exports.User = mongoose.model('user', userSchema)