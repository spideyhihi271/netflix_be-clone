const express = require('express');
const router = express.Router();

const genderController = require('../app/controllers/GenderController')


//[GENDERS] /api/genders/admin
router.delete('/admin/:_id', genderController.deleteGenderByIdForAdmin);
//[GENDERS] /api/genders/admin
router.put('/admin/:_id', genderController.updateGenderByIdForAdmin);
//[GENDERS] /api/genders/admin
router.get('/admin/:_id', genderController.getGenderByIdForAdmin);
//[GENDERS] /api/genders/admin
router.get('/admin', genderController.getAllGendersForAdmin);
//[GENDERS] /api/genders/admin
router.post('/admin', genderController.postNewGender);
//[GENDERS] /api/genders/
router.get('/', genderController.getAllGenders);

module.exports = router;
