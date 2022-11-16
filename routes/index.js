const crashRoutes = require('express').Router();
const mainRoutes = require('./main');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

module.exports = {
  crashRoutes,
  mainRoutes,
  usersRoutes,
  moviesRoutes,
};
