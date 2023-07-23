const format_data = require('../../utils/format_data');
const Pack = require('../model/Pack');
class PackController {
    // [GET] /api/pack/
    async getAllPack(req, res) {
        try {
            const packs = await Pack.find({ hidden: false });
            res.status(200).json(packs);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/pack/:id
    async getPackById(req, res) {
        try {
            const pack = await Pack.findOne({ _id: req.params._id });
            res.status(200).json(pack);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/pack/admin
    async getAllPackForAdmin(req, res) {
        try {
            let queries = req.query;
            const packs = await Pack.find();
            const data = format_data.packForAdmin(packs, queries);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/pack/admin/:id
    async getPackByIdForAdmin(req, res) {
        try {
            let queries = req.query;
            const packs = await Pack.find({ _id: req.params._id });
            const data = format_data.packForAdmin(packs, queries);
            res.status(200).json(data[0]);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [POST] /api/country/admin/
    async postNewPack(req, res) {
        try {
            const data = req.body;
            data.sold = 0;
            const pack = new Pack(data);
            pack.save();
            res.status(200).json({
                massage: "Created was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [PUT] /api/pack/admin/:id
    async updatePackByIdForAdmin(req, res) {
        try {
            const data = req.body;
            await Pack.findByIdAndUpdate(req.params._id, data);
            res.status(200).json({
                massage: "Update was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [DELETE] /api/pack/admin/:id
    async deletedPackByIdForAdmin(req, res) {
        try {
            await Pack.findByIdAndDelete(req.params._id);
            res.status(200).json({
                massage: "Deleted was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new PackController();
