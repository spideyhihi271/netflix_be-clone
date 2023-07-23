const express = require('express');
const router = express.Router();

const actorController = require('../app/controllers/ActorController')

//[GENDERS] /api/genders/admin
router.get('/admin', actorController.getAllActor);

module.exports = router;
