const express = require('express');
const { rejectUnauthorized } = require('../middleware/auth');
const { JWT } = require('../helper');

const app = express.Router();

// app.use(rejectUnauthorized);

app.get('/', rejectUnauthorized, (req, res) => res.json([]));

app.get('/profile', (req, res) => res.json(JWT.Decode(req.bearerToken)));

module.exports = app;
