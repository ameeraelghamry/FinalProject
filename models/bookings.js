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

// Booking Controller Functions (from test folder)
// Function to encrypt sensitive data (simplified for demo)
const encrypt = (text) => {
    // For demo purposes, just return masked version
    return text.replace(/\d(?=\d{4})/g, "*");
};

// Function to decrypt sensitive data (simplified for demo)
const decrypt = (text) => {
    // For demo purposes, just return the text
    return text;
};

const processPayment = async (req, res) => {
    try {
        console.log('=== PROCESSING PAYMENT START ===');
        console.log('Processing payment with form data:', req.body);

        // Extract form data
        const {
            fullname,
            email,
            phone,
            country,
            city,
            address,
            paymentMethod,
            card1,
            card2,
            card3,
            card4,
            expMonth,
            expYear,
            cvv,
            cardName
        } = req.body;

        // Validate required fields
        if (!fullname || !email || !phone || !country || !city || !address) {
            return res.status(400).render('error', {
                message: 'Please fill in all required personal and address information'
            });
        }

        // Validate payment method
        if (!paymentMethod) {
            return res.status(400).render('error', {
                message: 'Please select a payment method'
            });
        }

        // Only validate card information if card payment is selected
        if (paymentMethod === 'card') {
            if (!card1 || !card2 || !card3 || !card4 || !expMonth || !expYear || !cvv || !cardName) {
                return res.status(400).render('error', {
                    message: 'Please fill in all payment information'
                });
            }

            // Combine card number
            const fullCardNumber = `${card1}${card2}${card3}${card4}`;

            // Basic card number validation (should be 16 digits)
            if (fullCardNumber.length !== 16 || !/^\d+$/.test(fullCardNumber)) {
                return res.status(400).render('error', {
                    message: 'Please enter a valid 16-digit card number'
                });
            }

            // Validate expiry date
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
            const currentMonth = currentDate.getMonth() + 1;
            
            const expMonthNum = parseInt(expMonth);
            const expYearNum = parseInt(expYear);

            if (expMonthNum < 1 || expMonthNum > 12) {
                return res.status(400).render('error', {
                    message: 'Please enter a valid expiration month (01-12)'
                });
            }

            if (expYearNum < currentYear || (expYearNum === currentYear && expMonthNum < currentMonth)) {
                return res.status(400).render('error', {
                    message: 'Card has expired. Please use a valid card'
                });
            }

            console.log('Card payment validated successfully');
        } else if (paymentMethod === 'cash') {
            console.log('Cash payment selected - no card validation required');
        }

        // Since MongoDB is not connected, we'll create demo data without database operations
        console.log('Creating demo booking without database...');

        // Create sample car data
        const car = {
            name: 'Premium Sedan',
            specs: '2.0L 4-Cylinder Turbo Engine',
            image: '/images/logo (2).png', // Using existing logo as placeholder
            passengers: 5,
            luggage: 4,
            transmission: 'Automatic',
            dailyRate: 150
        };

        // Calculate rental details
        const pickupDate = new Date();
        const returnDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days later
        const rentalDays = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
        
        const rentalRate = car.dailyRate * rentalDays;
        const insuranceFee = 25.00;
        const taxes = rentalRate * 0.12; // 12% tax
        const totalAmount = rentalRate + insuranceFee + taxes;

        // Generate booking ID
        const bookingId = 'NW' + Math.random().toString(36).substr(2, 9).toUpperCase();

        console.log('Demo booking created successfully:', bookingId);

        // Prepare data for success page
        const bookingData = {
            bookingId: bookingId,
            carName: car.name,
            carSpecs: car.specs,
            carImage: car.image,
            passengers: `${car.passengers} Passengers`,
            luggage: `${car.luggage} Bags`,
            transmission: car.transmission,
            pickupDate: pickupDate.toLocaleDateString(),
            returnDate: returnDate.toLocaleDateString(),
            pickupLocation: 'Main Office - Downtown',
            pickupTime: '10:00 AM',
            rentalRate: rentalRate.toFixed(2),
            insuranceFee: insuranceFee.toFixed(2),
            taxes: taxes.toFixed(2),
            totalAmount: totalAmount.toFixed(2),
            customerName: fullname,
            customerEmail: email,
            paymentMethod: paymentMethod,
            paymentStatus: paymentMethod === 'cash' ? 'Pending (Pay at pickup)' : 'Processed'
        };

        console.log('=== RENDERING SUCCESS PAGE ===');
        console.log('Booking data:', bookingData);
        res.render('success', bookingData);

    } catch (error) {
        console.error('=== ERROR CAUGHT ===');
        console.error('Error processing payment:', error);
        res.status(500).render('error', {
            message: 'There was an error processing your booking. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

const getBooking = async (req, res) => {
    try {
        // Demo response without database
        res.status(200).json({
            status: 'success',
            message: 'Demo mode - no database operations available'
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

const getUserBookings = async (req, res) => {
    try {
        // Demo response without database
        res.status(200).json({
            status: 'success',
            results: 0,
            message: 'Demo mode - no database operations available',
            data: {
                bookings: []
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Additional booking controller functions for API routes
const getAllBookings = async (req, res) => {
    try {
        // Demo response without database
        res.status(200).json({
            status: 'success',
            results: 0,
            message: 'Demo mode - no database operations available',
            data: {
                bookings: []
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

const createBooking = async (req, res) => {
    try {
        console.log('Received booking data:', req.body);
        // Demo response without database
        const bookingId = 'NW' + Math.random().toString(36).substr(2, 9).toUpperCase();
        res.status(201).json({
            success: true,
            message: 'Booking created successfully (demo mode)',
            data: {
                bookingReference: bookingId,
                bookingId: bookingId
            }
        });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(400).json({
            success: false,
            message: 'Error creating booking',
            error: error.message
        });
    }
};

const getBookingByReference = async (req, res) => {
    try {
        // Demo response without database
        res.status(404).json({
            success: false,
            message: 'Booking not found (demo mode)'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving booking',
            error: error.message
        });
    }
};

const updateBooking = async (req, res) => {
    try {
        // Demo response without database
        res.status(404).json({
            success: false,
            message: 'Booking not found (demo mode)'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating booking',
            error: error.message
        });
    }
};

const cancelBooking = async (req, res) => {
    try {
        // Demo response without database
        res.status(404).json({
            success: false,
            message: 'Booking not found (demo mode)'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error cancelling booking',
            error: error.message
        });
    }
};

module.exports = {
    Booking,
    processPayment,
    getBooking,
    getUserBookings,
    getAllBookings,
    createBooking,
    getBookingByReference,
    updateBooking,
    cancelBooking,
    encrypt,
    decrypt
};