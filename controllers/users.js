const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const { actionMessages, errMessageNotFound } = require('../utils/constants');
const { NODE_ENV_DEFAULT, JWT_SECRET_DEFAULT } = require('../utils/config');

const { NODE_ENV = NODE_ENV_DEFAULT, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(errMessageNotFound.user));
      }
      return res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const { userEmail = email, userName = name } = user;
      return res.send({ userEmail, userName });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(err.message));
      }
      if (err.code === 11000) {
        return next(new ConflictError(actionMessages.errorUser));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(err.message));
      }
      if (err.code === 11000) {
        return next(new ConflictError(actionMessages.errorUser));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEFAULT,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch((err) => next(err));
};
