const router = require('express').Router();
const { validateMovieCreating, validateMovieRemoving } = require('../middlewares/validation');
const { getMovies, createMovie, removeMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateMovieCreating, createMovie);
router.delete('/:movieId', validateMovieRemoving, removeMovie);

module.exports = router;
