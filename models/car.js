const mongoose = require('mongoose')

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
    }
})

//exporting product itself
module.exports = mongoose.model('Car', carSchema);