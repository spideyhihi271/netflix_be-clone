const express = require('express');
const router = express.Router();

const billController = require('../app/controllers/BillController')


//[PACKS] /api/bill/_id
router.delete('/admin/:_id', billController.deletedBillByIdForAdmin);
//[PACKS] /api/bill/_id
router.get('/admin/:_id', billController.getBillByIdForAdmin);
//[PACKS] /api/bill/admin
router.get('/admin', billController.getAllBillForAdmin);
//[PACKS] /api/bill/
router.post('/', billController.createBill);
//[PACKS] /api/bill/:_id
router.get('/:_id', billController.getBillById);
//[PACKS] /api/bill/
router.get('/', billController.getAllBill);

module.exports = router;
