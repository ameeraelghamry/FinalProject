const mongoose = require('mongoose')

const rentalSchema = mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'car'
    },
    startDate: Date,
    endDate: Date,
    payment: Number,
})

//exporting product itself
module.exports = mongoose.model('Rental', rentalSchema);
