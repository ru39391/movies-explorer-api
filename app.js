require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  crashRoutes, mainRoutes, usersRoutes, moviesRoutes,
} = require('./routes/index');
const { errMessageNotFound } = require('./utils/constants');
const { NODE_ENV_DEFAULT, DB_CONN_DEFAULT } = require('./utils/config');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000, NODE_ENV = NODE_ENV_DEFAULT, DB_CONN } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? DB_CONN : DB_CONN_DEFAULT, {
  useNewUrlParser: true,
});

app.use(require('./middlewares/limiter'));
app.use(require('./middlewares/corsHandler'));

app.use(requestLogger);
app.use(crashRoutes);
app.use(mainRoutes);

app.use(auth);
app.use(usersRoutes);
app.use(moviesRoutes);

app.use('*', (req, res, next) => next(new NotFoundError(errMessageNotFound.request)));

app.use(helmet());
app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/errorHandler'));

app.listen(PORT);
