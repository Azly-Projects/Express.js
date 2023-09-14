const express = require('express');
const httpErrors = require('http-errors');

const app = express.Router();

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/', (req, res) => {
  res.json({ status: 'ok', data: req.body });
});

app.get('/unhandled-http-error', (req, res, next) => {
  next(httpErrors.NotImplemented());
});

app.get('/unknown-error', () => {
  throw new Error('Uknown Error for Test');
});

module.exports = app;
