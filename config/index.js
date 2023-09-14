const initializeDebug = require('debug')(process.env.DEBUG_NAMESPACE);
const logger = require('./logger');

const debug = {
  app: initializeDebug.extend('app'),
  router: initializeDebug.extend('router'),
};

module.exports = {
  debug,
  logger,
};
