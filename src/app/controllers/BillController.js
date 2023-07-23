const format_data = require('../../utils/format_data');
const Bill = require('../model/Bill');
const User = require('../model/User');
const Pack = require('../model/Pack');
class BillController {
    // [GET] /api/bill/
    async getAllBill(req, res) {
        try {
            const bills = await Bill.find({});
            res.status(200).json(bills);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/bill/:_id
    async getBillById(req, res) {
        try {
            const bill = await Bill.findOne({_id: req.params._id});
            res.status(200).json(bill);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [POST] /api/bill/
    async createBill(req, res) {
        try {
            let data = req.body;
            console.log(data);
            let today = new Date();
            today.setDate(today.getDate() + 30);
            data = {
                ...data,
                end: today,
                status: true
            }
            const pack = await Pack.findById(data.pack)
            const user = await User.findById(data.user);
            const bill = new Bill(data);
            let updateUser = user.toObject();
            let updatePack = pack.toObject();
            updateUser.pack = bill._id;
            updatePack.sold = pack.sold + 1;
            bill.save();
            await User.findByIdAndUpdate(data.user, updateUser);
            await Pack.findByIdAndUpdate(data.pack, updatePack);
            res.status(200).json({
                massage: 'Payment was completed'
            });

        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/bill/
    async getAllBillForAdmin(req, res) {
        try {
            let queries = req.query;
            const bills = await Bill.find({});
            const users = await User.find({});
            const packs = await Pack.find({});
            let data = format_data.billForAdmin(bills, users, packs, queries)
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/bill/:_id
    async getBillByIdForAdmin(req, res) {
        try {
            let queries = req.query;
            const bills = await Bill.find({_id: req.params._id});
            const users = await User.find({});
            const packs = await Pack.find({});
            let data = format_data.billForAdmin(bills, users, packs, queries)
            res.status(200).json(data[0]);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [DELETE] /api/country/admin/:id
    async deletedBillByIdForAdmin(req, res) {
        try {
            await Bill.findByIdAndDelete(req.params._id);
            res.status(200).json({
                massage: "Deleted was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    
}

module.exports = new BillController();
