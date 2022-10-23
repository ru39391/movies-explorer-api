const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { patterUrl } = require('../utils/constants');
const {
  getMovies, createMovie, removeMovie,
} = require('../controllers/movies');

const movieIdValidationConfig = {
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
};

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(patterUrl),
  }),
}), createMovie);
router.delete('/:movieId', celebrate(movieIdValidationConfig), removeMovie);

module.exports = router;
