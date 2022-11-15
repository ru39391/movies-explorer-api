const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/config');

const corsHandler = (req, res, next) => {
  const { method, headers } = req;
  const { origin } = headers;
  const requestHeaders = headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = corsHandler;
