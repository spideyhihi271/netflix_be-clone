const express = require('express');
const router = express.Router();

const movieController = require('../app/controllers/MovieController')


//[MOVIE] /api/movies/admin/:id
router.delete('/admin/:_id', movieController.deleteMovieByIdForAdmin);
//[MOVIE] /api/movies/admin/:id
router.patch('/admin/:_id', movieController.updateMovieByIdForAdmin);
//[MOVIE] /api/movies/admin/:id
router.post('/admin/', movieController.postNewMovie);
//[MOVIE] /api/movies/admin/:id
router.get('/admin/:_id', movieController.getMovieByIdForAdmin);
//[MOVIE] /api/movies/admin
router.get('/admin', movieController.getAllMovieForAdmin);
// MOVIE  /api/movies/:_id;
router.get('/:_id', movieController.getMovieById);
//[MOVIE] /api/movies/
router.get('/', movieController.getAllMovie);

module.exports = router;
