const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
const { NODE_ENV_DEFAULT, JWT_SECRET_DEFAULT, actionMessages } = require('../utils/constants');

const { NODE_ENV = NODE_ENV_DEFAULT, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
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
    // eslint-disable-next-line consistent-return
    return next(new AuthError(actionMessages.errorLogin));
  }

  req.user = payload;
  next();
};
