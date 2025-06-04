const express = require('express');
const router = express.Router();

const User = require('../controllers/User');

// Get all users
router.get('/', User.getAllUsers);

router.get('/signup', (req, res) => {
    res.render('signup', {user: (req.session.user === undefined ? "" : req.session.user)});
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
