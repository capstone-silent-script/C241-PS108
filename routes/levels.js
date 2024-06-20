const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 1MB limit
    },
});
const { authenticate } = require('../helper/authentication');

// Controllers
const { getLevels, postPredictions } = require('../controllers/levels');

// Routes
router.get('/', getLevels);
router.post('/:id/prediksi', upload.single('image'), authenticate, postPredictions);


module.exports = router;