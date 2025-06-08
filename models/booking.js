const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    carDetails: {
        name: {
            type: String,
            required: true
        },
        specifications: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    rentalDates: {
        pickup: {
            type: Date,
            required: true
        },
        return: {
            type: Date,
            required: true
        }
    },
    customerInfo: {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            street: String,
            city: String,
            country: String,
            zipcode: String
        }
    },
    paymentDetails: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: 'USD'
        },
        cardLastFour: {
            type: String,
            required: true
        }
    },
    bookingReference: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'confirmed'
    }
}, {
    timestamps: true
});

// Generate booking reference before saving
bookingSchema.pre('save', async function(next) {
    if (!this.bookingReference) {
        const date = new Date();
        const dateStr = date.getFullYear().toString() +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            date.getDate().toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this.bookingReference = `BR-${dateStr}-${random}`;
    }
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
