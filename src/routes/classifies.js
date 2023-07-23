const express = require('express');
const router = express.Router();

const classifyController = require('../app/controllers/ClassifyController')

//[GENDERS] /api/classify/admin
router.get('/admin', classifyController.getAllClassify);
//[GENDERS] /api/classify/
router.get('/', classifyController.getAllClassify);

module.exports = router;
