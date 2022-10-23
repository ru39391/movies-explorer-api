const { ACCESS_ERROR_CODE } = require('../utils/constants');

class AccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ACCESS_ERROR_CODE;
  }
}

module.exports = AccessError;
