const express = require('express');
const { v4 } = require('uuid');
const { Op } = require('sequelize');
const { SHA1 } = require('crypto-js');
const httpErrors = require('http-errors');
const { JWT } = require('../helper');
const { authValidator } = require('../validators');
const { User } = require('../models');

const app = express.Router();

/**
 * Sign up
 */
app.post('/sign-up', [authValidator.signUp], async (req, res) => {
  const { email, password, full_name } = req.body;
  const user = await User.create({
    email,
    password: SHA1(password).toString(),
    status: 'active',
    full_name,
  });
  // * Set payload content
  const payload = { user };

  // * Encode payload as JWT
  const token = await JWT.Encode(payload);

  // * Send response
  res.json({
    user,
    token,
  });
});

/**
 * Sign in
 */
app.post('/sign-in', [authValidator.signIn], async (req, res, next) => {
  const { identity } = req.body;
  const user = await User.findOne({
    where: {
      [Op.or]: [
        {
          email: identity,
        },
        {
          mobile: identity,
        },
        {
          username: identity,
        },
      ],
    },
  });

  if (user !== null) {
    // * Set payload content
    const payload = { user };

    // * Encode payload as JWT
    const token = await JWT.Encode(payload);

    // * Send response
    return res.json({
      user,
      token,
    });
  }

  return next(httpErrors.Unauthorized('Authentication Failure'));
});

app.post(
  '/forgot-password',
  [authValidator.forgotPassword],
  async (req, res) => {
    // * Example payload
    const user = {
      id: v4(),
      name: req.body.identity,
    };
    // * Set payload content
    const payload = { user };
    // * Encode payload as JWT
    const token = await JWT.Encode(payload);

    // * Send response
    res.json({
      user,
      token,
    });
  },
);

app.post('/reset-password', [authValidator.resetPassword], async (req, res) => {
  // * Example payload
  const user = {
    id: v4(),
    name: req.body.identity,
  };
  // * Set payload content
  const payload = { user };
  // * Encode payload as JWT
  const token = await JWT.Encode(payload);

  // * Send response
  res.json({
    user,
    token,
  });
});

module.exports = app;
