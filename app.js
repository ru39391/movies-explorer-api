require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, errors, Joi } = require('celebrate');
const NotFoundError = require('./errors/not-found-err');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_ADDRESS } = require('./utils/config');
const { actionMessages, errMessageNotFound } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(require('./middlewares/limiter'));
app.use(require('./middlewares/corsHandler'));

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(actionMessages.errorCrashTest);
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));

app.use('*', (req, res, next) => next(new NotFoundError(errMessageNotFound.request)));

app.use(helmet());
app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/errorHandler'));

app.listen(PORT);
