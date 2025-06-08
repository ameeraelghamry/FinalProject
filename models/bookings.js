const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
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

    status: {
        type: String, enum: ['booked'],
        default: 'booked'
    }, // status for requests

    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Booking = mongoose.model('bookings', bookingsSchema);
module.exports = Booking;