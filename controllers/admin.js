const RentalRequest = require('../models/rentRequest');
//const Booking = require('../models/booking');
//const Message = require('../models/Message');
const Car = require('../models/car');

// Get all pending rental requests with populated user and car info
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await rentRequest.find({ status: 'pending' })
            .populate('userId', 'FirstName LastName Email Phone')
            .populate('carId', 'name brand city price available category image');
        res.render('admin/requests', { requests });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Get all confirmed bookings with populated user and car info
// exports.getAllBookings = async (req, res) => {
//     try {
//         const bookings = await Booking.find()
//             .populate('userId', 'FirstName LastName Email Phone')
//             .populate('carId', 'name brand city price available category image');
//         res.render('admin/bookings', { bookings });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// };

// // Accept a rental request: move it to bookings, notify user, remove request
// exports.acceptRequest = async (req, res) => {
//     try {
//         const requestId = req.params.id;
//         const request = await RentalRequest.findById(requestId);
//         if (!request) return res.status(404).send('Request not found');

//         // Create a booking from the request info
//         const booking = new Booking({
//             userId: request.userId,
//             carId: request.carId,
//             rentStart: request.rentStart,
//             rentEnd: request.rentEnd,
//         });
//         await booking.save();

//         // Update car availability to false (booked)
//         await Car.findByIdAndUpdate(request.carId, { available: false });

//         // Send notification message to user
//         const message = new Message({
//             userId: request.userId,
//             content: `Your rental request for car ID ${request.carId} has been accepted.`,
//         });
//         await message.save();

//         // Delete the rental request after acceptance
//         await RentalRequest.findByIdAndDelete(requestId);

//         res.redirect('/admin/requests');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// };

// // Decline a rental request: delete it and notify user
// exports.declineRequest = async (req, res) => {
//     try {
//         const requestId = req.params.id;
//         const request = await RentalRequest.findById(requestId);
//         if (!request) return res.status(404).send('Request not found');

//         // Send notification message to user
//         const message = new Message({
//             userId: request.userId,
//             content: `Your rental request for car ID ${request.carId} has been declined.`,
//         });
//         await message.save();

//         // Delete the rental request after decline
//         await RentalRequest.findByIdAndDelete(requestId);

//         res.redirect('/admin/requests');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// };
