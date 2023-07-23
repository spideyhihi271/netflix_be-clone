const Movie = require('../model/Movie');
const Country = require('../model/Country');
const Actor = require('../model/Actor');
const formatData = require('../../utils/format_data');
class CountryController {
    // [GET] /api/country/
    async getAllCountry(req, res) {
        try {
            const countries = await Country.find({});
            res.status(200).json(countries);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/country/admin
    async getAllCountryForAdmin(req, res) {
        try {
            const queries = req.query;
            const countries = await Country.find({});
            const movies = await Movie.find({});
            const actors = await Actor.find({});
            const data = formatData.countryForAdmin(countries, movies, actors, queries);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/country/admin/:id
    async getCountryByIdForAdmin(req, res) {
        try {
            const country = await Country.findById(req.params._id);
            res.status(200).json(country);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [POST] /api/country/admin/
    async postNewCountry(req, res) {
        try {
            const data = req.body;
            const country = new Country(data);
            country.save();
            res.status(200).json({
                massage: "Created was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [PUT] /api/country/admin/:id
    async updateCountryByIdForAdmin(req, res) {
        try {
            const data = req.body;
            await Country.findByIdAndUpdate(req.params._id, data);
            res.status(200).json({
                massage: "Update was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
     // [DELETE] /api/country/admin/:id
    async deletedCountryByIdForAdmin(req, res) {
        try {
            await Country.findByIdAndDelete(req.params._id);
            res.status(200).json({
                massage: "Deleted was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    
}
  
module.exports = new CountryController();
  