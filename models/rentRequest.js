const mongoose = require('mongoose');

const rentRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // link to your User _id

    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },   // link to your Car _id

    rentStart: {
        type: Date,
        required: true
    },

    rentEnd: {
        type: Date,
        required: true
    },

    carStatus: {
        type: String,
        enum: ['pending', 'Booked'],
        default: 'pending'
    }, // status for requests

    createdAt: {
        type: Date,
        default: Date.now
    },
});

const rentRequest = mongoose.model('rentRequest', rentRequestSchema);
module.exports = rentRequest;