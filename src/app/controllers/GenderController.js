const Gender = require('../model/Gender');
const Movie = require('../model/Movie')
const formatData = require('../../utils/format_data');
class GenderController {
    // [GET] /api/movie/
    async getAllGenders(req, res) {
        try {
            const genders = await Gender.find({ hidden: false });
            res.status(200).json(genders);
        } catch (err) {
            res.status(500).json(err);
        }
    }
     // [GET] /api/movie/admin
    async getAllGendersForAdmin(req, res) {
        try {
            let queries = req.query;
            const genders = await Gender.find({});
            const movies = await Movie.find({});
            const data = formatData.genderForAdmin(genders, movies, queries);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/movie/admin
    async getGenderByIdForAdmin(req, res) {
        try {
            const gender = await Gender.findOne({ _id: req.params._id});
            res.status(200).json(gender);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/movie/admin
    async postNewGender(req, res) {
        try {
            const data = req.body;
            const gender = new Gender(data);
            gender.save();
            res.status(200).json({
                massage: "Created was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [PUT] /api/movie/admin
    async updateGenderByIdForAdmin(req, res) {
        try {
            const data = req.body;
            await Gender.findByIdAndUpdate(req.params._id, data);
            res.status(200).json({
                massage: "Update was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [DELETED] /api/movie/admin
    async deleteGenderByIdForAdmin(req, res) {
        try {
            await Gender.findByIdAndDelete(req.params._id);
            res.status(200).json({
                massage: "Deleted was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    
}
  
module.exports = new GenderController();
  