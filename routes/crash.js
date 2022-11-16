const crash = require('express').Router();
const { actionMessages } = require('../utils/constants');

crash.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(actionMessages.errorCrashTest);
  }, 0);
});

module.exports = crash;
