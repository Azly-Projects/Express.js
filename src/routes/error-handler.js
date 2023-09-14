/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {(err: any, req: Request, res: Response, next: NextFunction) => void} ExpressErrorHandler
 */

const httpErrors = require('http-errors');
const { validationResult } = require('express-validator');
const { debug } = require('../../config');
const logger = require('../../config/logger');

/** @type {ExpressErrorHandler} */
module.exports = (err, req, res, next) => {
  if (!httpErrors.isHttpError(err)) {
    debug.router('Error Handler :', err);
  }

  logger.error(err.message);

  const errors = validationResult(req);
  const JSONResponse = {
    code: 500,
    message: undefined, // error message for developer
    data: undefined, // any object
  };

  if (!res.headersSent) {
    // * Default error status: 500
    res.status(500);

    // * HTTP Errors
    if (httpErrors.isHttpError(err)) {
      // * Set default http status
      res.status(err.status);

      // * Set default object value
      JSONResponse.code = err.status;
      JSONResponse.message = err.message;

      // * 400 - Bad request
      if (err.status === 400) {
        JSONResponse.message = 'Bad Request';
        // ? Validation middleware
        if (err.message === 'validation') {
          JSONResponse.data = errors.mapped();
        }

        // ? Invalid JSON format
        if (err.message.match(/.* in JSON at position \d+/)) {
          JSONResponse.message = err.message;
        }

        // send response | 400
        return res.json(JSONResponse);
      }

      // * 401 - Unauthorized
      if (err.status === 401) {
        switch (err.message) {
          case 'UnauthorizedAPIKey':
            JSONResponse.message = 'Unauthorized API Key';
            break;

          case 'InvalidAPIKey':
            JSONResponse.message = 'Invalid API Key';
            break;

          case 'ExpiredToken':
            JSONResponse.message = 'Expired Token';
            break;

          case 'UnauthorizedToken':
            JSONResponse.message = 'Unauthorized Token';
            break;

          default:
            break;
        }

        // send response | 401
        return res.json(JSONResponse);
      }

      // * Unhandled HTTP Error
      JSONResponse.message = err.message;

      // send response
      return res.json(JSONResponse);
    }

    // * Instance of error
    if (err instanceof Error) {
      logger.error(err.message);
      JSONResponse.message = err.message;

      // send response
      return res.json(JSONResponse);
    }
  }

  // ? Header sent
  return next(err);
};
