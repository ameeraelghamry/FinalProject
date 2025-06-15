const express = require('express');
const router = express.Router();
const { Booking } = require('../models/booking');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Get booking status
router.get('/status/:bookingRef', async (req, res) => {
    try {
        console.log('Checking status for booking:', req.params.bookingRef);
        const booking = await Booking.findOne({ bookingReference: req.params.bookingRef });
        
        if (!booking) {
            console.log('Booking not found:', req.params.bookingRef);
            return res.status(400).json({ error: 'Booking not found' });
        }

        console.log('Found booking status:', booking.status);
        res.json({
            status: booking.status,
            bookingReference: booking.bookingReference
        });
    } catch (error) {
        console.error('Error fetching booking status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Handle file upload
router.post('/upload', upload.single('identityImage'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        res.json({ filename: req.file.filename });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 