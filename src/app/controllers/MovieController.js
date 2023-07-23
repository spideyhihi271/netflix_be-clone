const Movie = require('../model/Movie');
const Country = require('../model/Country');
const Actor = require('../model/Actor');
const Gender = require('../model/Gender');
const Classify = require('../model/Classify');
const formatData = require('../../utils/format_data');

class MovieController {
    // [GET] /api/movie/
    async getAllMovie(req, res) {
        try {
            const queries = req.query;
            const movies = await Movie.find({ hidden: false});
            const countries = await Country.find({});
            const actors = await Actor.find({});
            const genders = await Gender.find({});
            const classifies = await Classify.find({});
            const data = 
            formatData.mutilpleMovie(
                movies,
                countries,
                actors,
                genders,
                classifies,
                queries
            );
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/movie/:_id
    async getMovieById(req, res){
        try {
            const movie = await Movie.findOne({ _id: req.params._id});
            const countries = await Country.find({});
            const actors = await Actor.find({});
            const genders = await Gender.find({});
            const data = 
            formatData.onlyMovie(
                movie,
                countries,
                actors,
                genders
            );
            let movieUpdate = movie;
            movieUpdate.views = movie.views + 1;
            await Movie.findByIdAndUpdate(movie._id, movieUpdate);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/movie/admin
    async getAllMovieForAdmin(req, res) {
        try {
            const queries = req.query;
            const movies = await Movie.find({});
            const countries = await Country.find({});
            const actors = await Actor.find({});
            const genders = await Gender.find({});
            const classifies = await Classify.find({});
            const data = 
            formatData.mutilpleMovie(
                movies,
                countries,
                actors,
                genders,
                classifies,
                queries
            );
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /api/movie/admin
    async getMovieByIdForAdmin(req, res) {
        try {
            const queries = req.query;
            const movies = await Movie.find({ _id: req.params._id});
            const countries = await Country.find({});
            const actors = await Actor.find({});
            const genders = await Gender.find({});
            const classifies = await Classify.find({});
            const data = 
            formatData.mutilpleMovie(
                movies,
                countries,
                actors,
                genders,
                classifies,
                queries
            );
            res.status(200).json(data[0]);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [POST] /api/movie/admin/
    async postNewMovie(req, res) {
        try {
            const data = req.body;
            // Define data
            data.lenght = Number(data.length);
            data.rating = Number(data.rating);
            data.public = Number(data.public);
            data.country = { _id: data.country};
            data.class = { _id: data.class};
            data.genders = data.genders.map((item, idx) => data.genders[idx] = { _id: item});
            data.actors = data.actors.map((item, idx) => data.actors[idx] = { _id: item});
            data.type = 2;
            data.views = 0;
            let movie = new Movie(data)
            movie.save();
            res.status(200).json({
                massage: "Created was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [PUT] /api/movie/admin
    async updateMovieByIdForAdmin(req, res) {
        try {
            const data = req.body;
            // Define data
            data.lenght = Number(data.length);
            data.rating = Number(data.rating);
            data.public = Number(data.public);
            data.country = { _id: data.country};
            data.class = { _id: data.class};
            data.genders = data.genders.map((item, idx) => data.genders[idx] = { _id: item});
            data.actors = data.actors.map((item, idx) => data.actors[idx] = { _id: item});
            console.log(data);
            await Movie.findByIdAndUpdate(req.params._id, data);
            res.status(200).json({
                massage: "Update was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [DELETED] /api/movie/admin
    async deleteMovieByIdForAdmin(req, res) {
        try {
            await Movie.findByIdAndDelete(req.params._id);
            res.status(200).json({
                massage: "Deleted was compeleted!!!"
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
  
module.exports = new MovieController();
  