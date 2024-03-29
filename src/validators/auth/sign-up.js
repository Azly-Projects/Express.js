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
  body('email')
    .notEmpty()
    .withMessage('not-empty')
    .bail()
    .isEmail()
    .withMessage('valid-email')
    .bail(),
  body('username').optional(),
  body('password')
    .notEmpty()
    .withMessage('not-empty')
    .bail()
    .isStrongPassword({
      minLength: 6,
      minNumbers: 0,
      minSymbols: 0,
      minLowercase: 0,
      minUppercase: 0,
    })
    .withMessage('strong-password'),
  body('full_name').notEmpty().withMessage('not-empty').bail(),
  (req, res, next) =>
    !validationResult(req).isEmpty()
      ? next(httpErrors.BadRequest('validation'))
      : next(),
];
