const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const AuthController = require('./auth.controller');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), AuthController.login);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(protectRoute(), AuthController.getRandomNumber);

module.exports = router;
