const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

})

//exporting product itself
exports.User = mongoose.model('user', userSchema)