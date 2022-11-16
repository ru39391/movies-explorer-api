const { AUTH_ERROR_CODE } = require('../utils/constants');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH_ERROR_CODE;
  }
}

module.exports = AuthError;
