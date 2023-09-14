/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {(req: Request, res: Response, next: NextFunction) => void} ExpressMiddleware
 */

const httpErrors = require('http-errors');
const apiKey = require('./apikey.middleware');
const bearer = require('./bearer.middleware');

/** @type {ExpressMiddleware} */
const isAuthorized = (req, res, next) => {
  if (req.payload) {
    req.user = req.payload;
  }

  return next();
};

/** @type {ExpressMiddleware} */
const rejectUnauthorized = (req, res, next) => {
  if (!req.user) {
    return next(httpErrors.Unauthorized('unauthorized'));
  }

  return next();
};

module.exports = {
  apiKey,
  bearer,
  isAuthorized,
  rejectUnauthorized,
};
