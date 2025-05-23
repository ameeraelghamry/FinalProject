const mongoose = require('mongoose')

const rentalSchema = mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'car'
    },
    startDate: Date,
    endDate: Date
})

//exporting product itself
exports.Rental = mongoose.model('rental', rentalSchema)
