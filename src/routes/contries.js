const express = require('express');
const router = express.Router();

const countryController = require('../app/controllers/CountryController')


//[country] /api/country/admin/:id
router.delete('/admin/:_id', countryController.deletedCountryByIdForAdmin);
//[country] /api/country/admin/:id
router.put('/admin/:_id', countryController.updateCountryByIdForAdmin);
//[country] /api/country/admin
router.post('/admin', countryController.postNewCountry);
//[country] /api/country/admin
router.get('/admin', countryController.getAllCountryForAdmin);
//[country] /api/country/admin/:id
router.get('/admin/:_id', countryController.getCountryByIdForAdmin);
//[country] /api/country/
router.get('/', countryController.getAllCountry);

module.exports = router;
