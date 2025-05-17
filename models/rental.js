const mongoose = require('mongoose')

const rentalSchema = mongoose.Schema({

})

//exporting product itself
exports.Rental = mongoose.model('rental', rentalSchema)
