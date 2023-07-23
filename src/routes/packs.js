const express = require('express');
const router = express.Router();

const packController = require('../app/controllers/PackController')


//[PACKS] /api/pack/admin/:id
router.patch('/admin/:_id', packController.updatePackByIdForAdmin);
//[PACKS] /api/pack/admin/_id
router.delete('/admin/:_id', packController.deletedPackByIdForAdmin);
//[PACKS] /api/pack/
router.post('/admin', packController.postNewPack);
//[PACKS] /api/pack/:id
router.get('/admin/:_id', packController.getPackByIdForAdmin);
//[PACKS] /api/pack/
router.get('/admin', packController.getAllPackForAdmin);
//[PACKS] /api/pack/:id
router.get('/:_id', packController.getPackById);
//[PACKS] /api/pack/
router.get('/', packController.getAllPack);

module.exports = router;
