const mongoose = require('mongoose');

// Car Model Schema (from test folder)
const carSchema = mongoose.Schema({
    name:  {
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    miles:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    seats:{
        type: Number,
        required: true,
    },
    available:{ //whether car is booked according to date or not
        type: Boolean,
        default: true
    },
    featured: {   //whether to be featured in home
    type: Boolean,
    default: false
    },
    //for car details
    description: String,
    horsepower: String,
    cylinders: String,
    maxSpeed: String,
    Model: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String

})

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
