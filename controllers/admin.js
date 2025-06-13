const rentRequest = require('../models/rentRequest');
const Booking = require('../models/bookings');
//const Message = require('../models/Message');
const Car = require('../models/car');
const Notification = require('../models/notification');

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await rentRequest.find()
            .populate('userId', 'FirstName LastName Email Phone')
            .populate('carId', 'name brand city price available category image');
        console.log(requests);
        res.render('Admin/requests', { requests });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('userId', 'FirstName LastName Email Phone')
            .populate('carId', 'name brand city price available category image');
        res.render('admin/bookings', { bookings });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.acceptRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const request = await rentRequest.findById(requestId).populate('carId', 'name');
        if (!request) return res.status(404).send('Request not found');

        // Create booking
        const booking = new Booking({
            userId: request.userId,
            carId: request.carId,
            rentStart: request.rentStart,
            rentEnd: request.rentEnd,
        });
        await booking.save();

        await Car.findByIdAndUpdate(rentRequest.carId, { available: false }); //available not recognised!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // Create notification for user
        await Notification.create({
            userId: request.userId,
            content: `Your rental request for car "${request.carId.name}" has been approved.`
        });


        // Delete the rental request
        await rentRequest.findByIdAndDelete(requestId);

        res.redirect('/admin/requests');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.declineRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const request = await rentRequest.findById(requestId).populate('carId', 'name');
        if (!request) return res.status(404).send('Request not found');

        // Create notification for user
        await Notification.create({
            userId: request.userId,
            content: `Your rental request for car "${request.carId.name}" has been Declined.`
        });

        // Delete the rental request
        await rentRequest.findByIdAndDelete(requestId);

        res.redirect('/admin/requests');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
