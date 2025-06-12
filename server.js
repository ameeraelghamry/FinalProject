const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the correct directories
app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// Database setup
const Booking = require('./models/bookings');

// Connect to MongoDB with better error handling
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/car-rental', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        // Don't exit the process, allow the server to start without DB
        console.log('Server will start without database connection');
    }
}

// Start server with proper error handling
async function startServer() {
    try {
        // First try to connect to MongoDB
        await connectDB();

        // Then start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use. Please try a different port or close the application using this port.`);
            } else {
                console.error('Error starting server:', err.message);
            }
            process.exit(1);
        });
    } catch (err) {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    }
}

// Routes start here
// HTML Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'checkout.html'));
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'success.html'));
});

// API Routes
// Get all bookings
app.get('/api/bookings', async (req, res) => {
    if (!mongoose.connection.readyState) {
        return res.status(503).json({
            success: false,
            message: 'Database connection not available'
        });
    }
    try {
        const bookings = await Booking.find();
        res.json({
            success: true,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving bookings',
            error: error.message
        });
    }
});

// Create a new booking
app.post('/api/bookings', async (req, res) => {
    if (!mongoose.connection.readyState) {
        return res.status(503).json({
            success: false,
            message: 'Database connection not available'
        });
    }
    try {
        console.log('Received booking data:', req.body);
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: {
                bookingReference: booking.bookingReference,
                bookingId: booking._id
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
});

// Get a specific booking
app.get('/api/bookings/:reference', async (req, res) => {
    if (!mongoose.connection.readyState) {
        return res.status(503).json({
            success: false,
            message: 'Database connection not available'
        });
    }
    try {
        const booking = await Booking.findOne({ bookingReference: req.params.reference });
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        res.json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving booking',
            error: error.message
        });
    }
});

// Update a booking
app.put('/api/bookings/:reference', async (req, res) => {
    if (!mongoose.connection.readyState) {
        return res.status(503).json({
            success: false,
            message: 'Database connection not available'
        });
    }
    try {
        const booking = await Booking.findOneAndUpdate(
            { bookingReference: req.params.reference },
            req.body,
            { new: true, runValidators: true }
        );
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        res.json({
            success: true,
            message: 'Booking updated successfully',
            data: booking
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating booking',
            error: error.message
        });
    }
});

// Cancel a booking
app.patch('/api/bookings/:reference/cancel', async (req, res) => {
    if (!mongoose.connection.readyState) {
        return res.status(503).json({
            success: false,
            message: 'Database connection not available'
        });
    }
    try {
        const booking = await Booking.findOneAndUpdate(
            { bookingReference: req.params.reference },
            { status: 'cancelled' },
            { new: true }
        );
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }
        res.json({
            success: true,
            message: 'Booking cancelled successfully',
            data: booking
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error cancelling booking',
            error: error.message
        });
    }
});

// Process checkout and create booking
app.post('/api/checkout/process', async (req, res) => {
    if (!mongoose.connection.readyState) {
        return res.status(503).json({
            success: false,
            message: 'Database connection not available'
        });
    }

    try {
        const bookingData = req.body;
        
        // Transform the data to match the Booking schema
        const booking = new Booking({
            carDetails: {
                name: bookingData.car.name,
                specifications: bookingData.car.specifications,
                image: bookingData.car.image || 'default-car.jpg'
            },
            rentalDates: {
                pickup: new Date(bookingData.rental.pickupDate),
                return: new Date(bookingData.rental.returnDate)
            },
            customerInfo: {
                fullName: bookingData.customer.name,
                email: bookingData.customer.email,
                phone: bookingData.customer.phone
            },
            paymentDetails: {
                amount: bookingData.car.rate,
                cardLastFour: bookingData.payment.cardLastFour
            },
            bookingReference: 'NWR-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase(),
            status: 'confirmed'
        });

        await booking.save();

        res.json({
            success: true,
            booking: {
                bookingReference: booking.bookingReference,
                totalAmount: booking.paymentDetails.amount,
                status: booking.status
            }
        });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// //Handle 404 errors for API routes
// app.use('/api/*', (req, res) => {
//     res.status(404).json({
//         success: false,
//         message: 'API endpoint not found'
//     });
// });

// Handle 404 errors for HTML routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// Start the server
startServer(); 