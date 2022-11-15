const { celebrate, Joi } = require('celebrate');
const { patterUrl } = require('../utils/constants');

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});
const validateUserUpdating = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
});
const validateMovieCreating = celebrate({
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
});
const validateMovieRemoving = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string(),
  }),
});

module.exports = {
  validateSignin,
  validateSignup,
  validateUserUpdating,
  validateMovieCreating,
  validateMovieRemoving,
};
