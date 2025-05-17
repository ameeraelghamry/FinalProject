const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: {
        type: Number,
        required: true,
    },
    miles: Number,
})

//exporting product itself
exports.Product = mongoose.model('cars', productSchema)