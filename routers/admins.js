const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/requests', adminController.getAllRequests);

router.get('/bookings', adminController.getAllBookings);

router.post('/requests/accept/:id', adminController.acceptRequest);

router.post('/requests/decline/:id', adminController.declineRequest);


module.exports = router;
