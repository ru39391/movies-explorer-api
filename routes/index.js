const express = require('express');
const auth = require('../middlewares/auth');
const { validateSignin, validateSignup } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');
const { createUser, login } = require('../controllers/users');
const { actionMessages, errMessageNotFound } = require('../utils/constants');

const app = express();

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(actionMessages.errorCrashTest);
  }, 0);
});

app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);

app.use(auth);
app.use(require('./users'));
app.use(require('./movies'));

app.use('*', (req, res, next) => next(new NotFoundError(errMessageNotFound.request)));