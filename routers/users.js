const express = require('express');
const router = express.Router();

const User = require('../controllers/User');
const Notification = require('../models/notification');

// Get all users
router.get('/', User.getAllUsers);

router.get('/signup', (req, res) => {
  res.render('signup', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get('/:userId/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId })
      .sort({ createdAt: -1 }); // newest first
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign up
router.post('/signup', User.createUser);

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json(err);
    }
    res.redirect('/');
  });
});



module.exports = router;
