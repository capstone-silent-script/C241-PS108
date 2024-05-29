const express = require('express');
const router = express.Router();

// Controller
const { getSignLibraries, getSignById } = require('../controllers/libraries');

// Routes
router.get('/', getSignLibraries);
router.get('/:id', getSignById);

module.exports = router;