const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    // Customer Information
    fullname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        lowercase: true
    },
    phone: {
        type: String,
        required: false
    },
    identityImage: {
        type: String, // Will store file path or base64
        required: false
    },
    
    // Address Information
    country: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    
    // Payment Information
    paymentMethod: {
        type: String,
        required: false,
        enum: ['card', 'cash', 'bank-transfer']
    },
    
    // Card details (only stored if needed, usually you wouldn't store these for security)
    cardName: {
        type: String,
        required: false
    },
    
    // Booking Details
    carName: {
        type: String,
        default: 'Selected Vehicle'
    },
    pickupDate: {
        type: String,
        default: 'Not specified'
    },
    returnDate: {
        type: String,
        default: 'Not specified'
    },
    pickupLocation: {
        type: String,
        default: 'Not specified'
    },
    
    // Payment Summary
    rentalRate: {
        type: Number,
        default: 0
    },
    insurance: {
        type: Number,
        default: 0
    },
    taxes: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    
    // Booking Reference
    bookingReference: {
        type: String,
        unique: true
    },
    
    // Status
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    
    // Timestamps
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

// Generate booking reference before saving
bookingSchema.pre('save', function(next) {
    if (!this.bookingReference) {
        const year = new Date().getFullYear();
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        this.bookingReference = `NW-${year}-${randomNumber}`;
    }
    next();
});

bookingSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

bookingSchema.set('toJSON', {
    virtuals: true,
});

// Export with custom collection name 'checkout'
exports.Booking = mongoose.model('Booking', bookingSchema, 'checkout');
exports.bookingSchema = bookingSchema;