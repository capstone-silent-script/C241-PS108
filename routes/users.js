const express = require('express');
const router = express.Router();
const { authenticate } = require('../helper/authentication');

// Controllers
const { registerUser, getProfile, updateProfile, deleteProfile } = require('../controllers/users');

// Routes
router.post('/register', registerUser);
router.get('/profile/:id', authenticate, getProfile);
router.post('/profile', authenticate, updateProfile);
router.delete('/profile/:id', authenticate, deleteProfile);


module.exports = router;