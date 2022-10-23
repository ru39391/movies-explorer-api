const { isCelebrateError } = require('celebrate');
const { actionMessages, BAD_REQUEST_ERROR_CODE, VALIDATION_ERROR_CODE } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const { message } = err;
    const key = err.details.has('body') ? 'body' : 'params';
    const { details: [errorDetails] } = err.details.get(key);
    res
      .status(VALIDATION_ERROR_CODE)
      .send({ message: `${message}: ${errorDetails.message}` });
  } else {
    const { statusCode = BAD_REQUEST_ERROR_CODE, message } = err;
    res
      .status(statusCode)
      .send({
        message: statusCode === BAD_REQUEST_ERROR_CODE
          ? actionMessages.errorRequest
          : message,
      });
  }

  next();
};

module.exports = errorHandler;
