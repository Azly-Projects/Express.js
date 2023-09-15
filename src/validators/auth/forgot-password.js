const httpErrors = require('http-errors');
const { body, validationResult } = require('express-validator');

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {(req: Request, res: Response, next: NextFunction) => void} ExpressMiddleware
 */

/** @type {ExpressMiddleware[]} */
module.exports = [
  body('identity').notEmpty().withMessage('not-empty'),
  (req, res, next) =>
    !validationResult(req).isEmpty()
      ? next(httpErrors.BadRequest('validation'))
      : next(),
];
