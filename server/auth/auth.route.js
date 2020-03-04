/**
* Routes for the /api/auth endpoints
* @module Auth Routes
*/

const express = require('express');
const routeValidation = require('./auth.validate');
const AuthController = require('./auth.controller');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/login')
  /**
  * Login a user
  *
  * @name Login
  * @path {POST} /api/auth/login
  * @body {String} req.body.username The username of user trying to login.
  * @body {String} req.body.password The password of user trying to login.
  * @code {200} If the request is successful.
  * @response {Object} auth
  * @response {Boolean} auth.success True if the auth request was successfull.
  * @response {String} auth.message The message 'Authentication successfull'.
  * @response {Object} auth.user An object containing the user's fields.
  * @response {String} auth.token The JWT for the user.
  * @code {401} If Authentication failed.
  * @response {APIError} error
  * @response {APIError} error.message Authentication failed. User not found.
  * @response {APIError} error.message Authentication failed. Invalid password.
  * @code {400} If validation failed.
  * @response {validationError} validationError
  * @response {validationError} validationError.error Bad Request
  */
  .post(routeValidation.login, AuthController.login);

router.route('/random-number')
  /**
  * Get a random number
  *
  * @name Random Number
  * @path {GET} /api/auth/random-number
  * @auth This route requires a valid token with no permissions.
  * If authentication fails it will return a 401 error.
  * @header {String} Authorization Requires a 'Bearer Token' with a valid token.
  * @code {200} If the request is successful.
  * @response {Object} object
  * @response {Integer} object.num Responds with a random number.
  * @code {401} If Authentication failed.
  */
  .get(protectRoute(), AuthController.getRandomNumber);

module.exports = router;
