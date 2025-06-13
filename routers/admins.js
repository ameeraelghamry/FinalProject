const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const carController = require('../controllers/Car');

router.get('/', carController.getAllCars);

router.get('/requests', adminController.getAllRequests);

router.get('/requests/details/:id', adminController.getRequestDetails );

router.get('/bookings/details/:id', adminController.getBookingDetails );

router.get('/bookings', adminController.getAllBookings);

router.post('/requests/accept/:id', adminController.acceptRequest);

router.post('/requests/decline/:id', adminController.declineRequest);


module.exports = router;
