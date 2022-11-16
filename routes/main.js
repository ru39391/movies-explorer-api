const main = require('express').Router();
const { validateSignin, validateSignup } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

main.post('/signin', validateSignin, login);
main.post('/signup', validateSignup, createUser);

module.exports = main;
