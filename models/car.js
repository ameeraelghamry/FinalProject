const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    name: String,
    brand: String,
    city: String,
    image: String,
    price: {
        type: Number,
        required: true,
    },
    miles: Number,
    category: String,
    seats: Number
})

//exporting product itself
module.exports = mongoose.model('Car', carSchema);