const NODE_ENV_DEFAULT = 'development';
const JWT_SECRET_DEFAULT = 'dev-secret';
const DB_ADDRESS = 'mongodb://localhost:27017/moviesdb';

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'https://ru39391-d.students.nomoredomains.icu',
  'http://ru39391-d.students.nomoredomains.icu',
  'http://130.193.49.197',
  'http://localhost:3000',
];

module.exports = {
  allowedCors,
  DB_ADDRESS,
  NODE_ENV_DEFAULT,
  JWT_SECRET_DEFAULT,
  DEFAULT_ALLOWED_METHODS,
};
