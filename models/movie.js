const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const { errMessageValidation } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, errMessageValidation.required],
  },
  director: {
    type: String,
    required: [true, errMessageValidation.required],
  },
  duration: {
    type: Number,
    required: [true, errMessageValidation.required],
  },
  year: {
    type: String,
    required: [true, errMessageValidation.required],
  },
  description: {
    type: String,
    required: [true, errMessageValidation.required],
  },
  image: {
    type: String,
    required: [true, errMessageValidation.required],
    validate: validators.isURL({ message: errMessageValidation.url }),
  },
  trailerLink: {
    type: String,
    required: [true, errMessageValidation.required],
    validate: validators.isURL({ message: errMessageValidation.url }),
  },
  thumbnail: {
    type: String,
    required: [true, errMessageValidation.required],
    validate: validators.isURL({ message: errMessageValidation.url }),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, errMessageValidation.required],
  },
  movieId: {
    type: String,
    required: [true, errMessageValidation.required],
  },
  nameRU: {
    type: String,
    required: [true, errMessageValidation.required],
  },
  nameEN: {
    type: String,
    required: [true, errMessageValidation.required],
  },
});

module.exports = mongoose.model('movie', movieSchema);
