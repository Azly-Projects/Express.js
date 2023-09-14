/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {(req: Request, res: Response, next: NextFunction) => void} ExpressMiddleware
 */

const httpErrors = require('http-errors');
const { header, validationResult } = require('express-validator');

/** @type {ExpressMiddleware[]} */
module.exports = [
  header(process.env.API_KEY_NAME)
    .custom((value) => {
      if (process.env.API_KEY_AUTH === 'true') {
        return !!(value && value === process.env.API_KEY_PASS);
      }

      return true;
    })
    .withMessage((value) => (value && value !== process.env.API_KEY_PASS
      ? 'invalid-api-key'
      : 'not-empty')),
  (req, res, next) => {
    // * Validation result
    const errors = validationResult(req);
    // ? Error is not empty
    if (!errors.isEmpty()) {
      const apiKey = errors.mapped()[process.env.API_KEY_NAME.toLowerCase()];
      if (apiKey.msg === 'not-empty') {
        // return error as unauthorized
        return next(httpErrors.Unauthorized('UnauthorizedAPIKey'));
      }

      // return error as invalid
      return next(httpErrors.Unauthorized('InvalidAPIKey'));
    }

    return next();
  },
];
