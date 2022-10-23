const Movie = require('../models/movie');
const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const AccessError = require('../errors/access-err');
const { actionMessages, errMessageNotFound } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(err.message));
      }
      return next(err);
    });
};

module.exports.removeMovie = (req, res, next) => {
  const { _id } = req.user;
  const { movieId } = req.params;

  Movie.findById(movieId)
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(errMessageNotFound.movie));
      }
      // eslint-disable-next-line default-case
      switch (_id === JSON.stringify(Movie.owner).split('"')[1]) {
        case true:
          Movie.findOneAndRemove({ owner: _id, _id: movieId })
            .then(() => res.send({ message: actionMessages.successMovieRemoved }))
            .catch((err) => next(err));
          break;
        case false:
          return next(new AccessError(actionMessages.errorMovieAccess));
      }
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(actionMessages.errorId));
      }
      return next(err);
    });
};