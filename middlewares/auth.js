const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
const { actionMessages } = require('../utils/constants');
const { NODE_ENV_DEFAULT, JWT_SECRET_DEFAULT } = require('../utils/config');

const { NODE_ENV = NODE_ENV_DEFAULT, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secretKey = NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEFAULT;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(actionMessages.errorLogin));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(new AuthError(actionMessages.errorLogin));
    return;
  }

  req.user = payload;
  next();
};
