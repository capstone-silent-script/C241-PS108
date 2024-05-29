const express = require('express');
const router = express.Router();
const multer = require('multer');

// Routes
router.post('/:id', upload.single('image'), getPrediction);