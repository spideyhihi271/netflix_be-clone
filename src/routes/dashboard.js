const express = require('express');
const router = express.Router();

const dashboardController = require('../app/controllers/DashboardController')


//[PACKS] /api/bill/
router.get('/admin/saleUser', dashboardController.getSaleandUser);
//[PACKS] /api/bill/
router.get('/admin/sale', dashboardController.getSaleToday);
//[PACKS] /api/bill/
router.get('/admin/allSale', dashboardController.getAllSale);
//[PACKS] /api/bill/today
router.get('/admin/todayBill', dashboardController.getAllBillToday);


module.exports = router;
