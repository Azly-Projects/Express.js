const express = require('express');
const { v4 } = require('uuid');
const { JWT } = require('../helper');
const { authValidator } = require('../validators');

const app = express.Router();

/**
 * Sign up
 */
app.post('/sign-up', [authValidator.signUp], async (req, res) => {
  // * Example payload
  const user = {
    id: v4(),
    name: req.body.full_name,
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

/**
 * Sign in
 */
app.post('/sign-in', [authValidator.signIn], async (req, res) => {
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
