const router = require('express').Router();
const { validateMovieCreating, validateMovieRemoving } = require('../middlewares/validation');
const { getMovies, createMovie, removeMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validateMovieCreating, createMovie);
router.delete('/movies/:movieId', validateMovieRemoving, removeMovie);

module.exports = router;
