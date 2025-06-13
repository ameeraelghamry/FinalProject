const express = require('express');
const router = express.Router();

const User = require('../controllers/User');
const Notification = require('../models/notification');

const {
  sendResetCode,
  verifyResetCode,
  resetPassword
} = require('../controllers/User');  // reset-forgotpass and verify 

// Note: signup and login page routes are handled in main app.js
// These routes handle the form submissions only
 
  
// Sign up
router.post('/signup', User.createUser);

//jomana
// Login route 
router.post('/login', User.loginUser); //creates 

router.post('/forgotpassword', sendResetCode);      //forgot pass  page
router.post('/verify', verifyResetCode);        // Code verification page
router.post('/resetpass', resetPassword);       // New password input page


router.get('/logout', (req, res) => { //destroying the session
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json(err);
    }
    res.redirect('/');
  });
});


// Get all users
router.get('/', User.getAllUsers);


router.get('/:userId/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId })
      .sort({ createdAt: -1 }); // newest first
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


  module.exports = router;