const express = require('express');
const path = require('path');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('checkout');
});

// Handle form submission
app.post('/process-payment', (req, res) => {
    // In a real application, you would process the payment here
    // For demo purposes, we'll just pass the form data to the success page
    const bookingData = {
        bookingId: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        carName: 'Sample Car', // This would come from your database
        carSpecs: '2.0L 4-Cylinder Engine',
        carImage: '/images/car-image.jpg',
        passengers: '5 Passengers',
        luggage: '4 Bags',
        transmission: 'Automatic',
        pickupDate: req.body.pickupDate || 'Not specified',
        returnDate: req.body.returnDate || 'Not specified',
        pickupLocation: req.body.pickupLocation || 'Not specified',
        pickupTime: req.body.pickupTime || 'Not specified',
        rentalRate: '150.00',
        insuranceFee: '25.00',
        taxes: '17.50',
        totalAmount: '192.50'
    };
    
    res.render('success', bookingData);
});

// Download confirmation route
app.get('/download-confirmation', (req, res) => {
    // In a real application, you would generate a PDF here
    res.send('Confirmation download functionality will be implemented here');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 