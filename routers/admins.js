const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/requests', adminController.getAllRequests);

router.get('/bookings', adminController.getAllBookings);




// Accept a rental request by ID
//router.post('/requests/accept/:id', adminController.acceptRequest);

// Decline a rental request by ID
//router.post('/requests/decline/:id', adminController.declineRequest);


module.exports = router;
