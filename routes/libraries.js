const express = require('express');
const router = express.Router();

// Controllers
const { getAllCategories, 
    getAllHuruf, 
    getHurufById,
    getAllSalam,
    getSalamById,
    getAllHubungan,
    getHubunganById,
    getAllMakanan,
    getMakananById,
    getAllKesehatan,
    getKesehatanById,
    getAllFrasa,
    getFrasaById } = require('../controllers/libraries');

// Routes
router.get('/kategori', getAllCategories );
router.get('/huruf', getAllHuruf );
router.get('/huruf/:id', getHurufById );
router.get('/salam', getAllSalam );
router.get('/salam/:id', getSalamById );
router.get('/frasa', getAllFrasa  );
router.get('/frasa/:id', getFrasaById );
router.get('/hubungan', getAllHubungan );
router.get('/hubungan/:id', getHubunganById );
router.get('/kesehatan', getAllKesehatan );
router.get('/kesehatan/:id', getKesehatanById );
router.get('/makanan', getAllMakanan );
router.get('/makanan/:id', getMakananById );


module.exports = router;