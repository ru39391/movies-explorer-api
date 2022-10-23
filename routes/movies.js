const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { patterUrl } = require('../utils/constants');
const {
  getMovies, createMovie, removeMovie,
} = require('../controllers/movies');

const movieIdValidationConfig = {
  params: Joi.object().keys({
    movieId: Joi.string(),
  }),
};

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(patterUrl),
    trailerLink: Joi.string().required().pattern(patterUrl),
    thumbnail: Joi.string().required().pattern(patterUrl),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
router.delete('/:movieId', celebrate(movieIdValidationConfig), removeMovie);

module.exports = router;
