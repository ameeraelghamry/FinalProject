const mongoose = require('mongoose');

const rentRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },

    rentStart: {
        type: Date,
        required: true
    },

    rentEnd: {
        type: Date,
        required: true
    },

    available: { 
        type: Boolean, 
        default: true 
    },


    createdAt: {
        type: Date,
        default: Date.now
    },
});

const rentRequest = mongoose.model('rentRequest', rentRequestSchema);
module.exports = rentRequest;