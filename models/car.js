const mongoose = require('mongoose');

// Car Model Schema (from test folder)
const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specs: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
    luggage: {
        type: Number,
        required: true
    },
    transmission: {
        type: String,
        enum: ['Automatic', 'Manual'],
        required: true
    },
    dailyRate: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
});

const Car = mongoose.model('Cars', carSchema);
module.exports = Car;
