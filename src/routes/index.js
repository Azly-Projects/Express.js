const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const httpErrors = require('http-errors');
const compression = require('compression');

const app = express();

// * Load middleware
const { authMiddleware } = require('../middleware');

// * Load routes
const authRouter = require('./auth');
const usersRouter = require('./users');
const errorHandler = require('./error-handler');

// * Express global middleware
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());

// * Security middleware
app.use(authMiddleware.apiKey);
app.use(authMiddleware.bearer);
app.use(authMiddleware.isAuthorized);

// * Initialize route paths
app
  .route('/')
  .get((req, res) => {
    res.json({
      status: 'ok',
    });
  })
  .post((req, res) => {
    res.json({
      status: 'ok',
    });
  })
  .put(() => {
    throw new Error('Uknown Error for Test');
  });
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// * Handle 404 route path
app.use((req, res, next) => next(httpErrors.NotFound()));

// * Error handler
app.use(errorHandler);

module.exports = app;
