const express = require('express');
const router = express.Router();

const User = require('../controllers/User');

// Get all users
router.get('/', User.getAllUsers);

// Sign up
router.post('/', User.createUser);

module.exports = router;
