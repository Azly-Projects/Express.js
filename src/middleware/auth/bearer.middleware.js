/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {(req: Request, res: Response, next: NextFunction) => void} ExpressMiddleware
 */

const httpErrors = require('http-errors');
const { header, validationResult } = require('express-validator');
const { JWT } = require('../../helper');

/** @type {ExpressMiddleware[]} */
module.exports = [
  header('Authorization')
    .custom((value, { req }) => {
      if (value) {
        const token = value.replace('Bearer', '').trim();
        return JWT.Verify(token).then(
          ({ payload }) => {
            req.payload = payload;
            req.bearerToken = token;
            return true;
          },
          (err) => {
            if (!req.path.match(/auth/)) {
              throw err.code;
            }

            return true;
          },
        );
      }

      return true;
    })
    .bail(),
  (req, res, next) => {
    // * Validation result
    const errors = validationResult(req);
    // ? Error is not empty
    if (!errors.isEmpty()) {
      const { authorization } = errors.mapped();
      if (authorization.msg === 'ERR_JWT_EXPIRED') {
        // return error as expired token
        return next(httpErrors.Unauthorized('ExpiredToken'));
      }

      // return error as unauthorized
      return next(httpErrors.Unauthorized('UnauthorizedToken'));
    }

    return next();
  },
];
