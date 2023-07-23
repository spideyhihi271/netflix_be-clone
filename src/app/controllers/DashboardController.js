const Movie = require('../model/Movie');
const Country = require('../model/Country');
const Actor = require('../model/Actor');
const Gender = require('../model/Gender');
const Classify = require('../model/Classify');
const Bill = require('../model/Bill');
const formatData = require('../../utils/format_data');
const Pack = require('../model/Pack');
const User = require('../model/User');

class DashboardController {
    // [GET] /api/dashboard/admin/sale
    async getSaleToday(req, res) {
        try {
            const bills = await Bill.find({});
            const packs = await Pack.find({});
            let data = formatData.totalSaleToday(bills, packs);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/dashboard/admin/sale
    async getAllSale(req, res) {
        try {
            const bills = await Bill.find({});
            const packs = await Pack.find({});
            let data = formatData.allSale(bills, packs);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/dashboard/admin/sale
    async getAllBillToday(req, res) {
        try {
            const bills = await Bill.find({});
            const packs = await Pack.find({});
            const users = await User.find({});
            let data = formatData.allBillToday(bills, packs, users);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/dashboard/admin/sale
    async getSaleandUser(req, res) {
        try {
            const bills = await Bill.find({});
            const packs = await Pack.find({});
            const users = await User.find({});
            let data = formatData.billandUserToday(bills, packs, users);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
  
module.exports = new DashboardController();
  