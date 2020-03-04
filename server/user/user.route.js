/**
* Routes for the /api/users endpoints
* @module User Routes
*/

const express = require('express');
const routeValidation = require('./user.validate');
const UserController = require('./user.controller');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /**
  * Get a list of users
  *
  * @name User List
  * @path {GET} /api/users
  * @auth This route requires a token with Admin permission.
  * If authentication fails it will return a 401 error.
  */
  .get(protectRoute(['Admin']), UserController.list)

  /**
  * Create a new user
  *
  * @name Create User
  * @path {POST} /api/users
  * @auth This route requires a token with Admin permission.
  * If authentication fails it will return a 401 error.
  * @body {object} User is an object containing the required fields
  * @code {200} If the request is successful.
  * @response {Object} User Return the newly created user.
  * @code {401} If authentication fails.
  */
  .post(protectRoute(['Admin']), routeValidation.create, UserController.create);

router.route('/:userId')
  /**
  * Get a User
  *
  * @name Get User
  * @path {POST} /api/users/:userId
  * @auth This route requires a token with Admin permission.
  * If authentication fails it will return a 401 error.
  * @params {String} :userId is the unique identifier for the user.
  * @code {200} if the request is successful.
  * @response {Object} User Return the user.
  * @code {401} If authentication fails.
  * @code {404} If user is not found.
  * @response {APIError} Error Return an APIError if the user is not found.
  */
  .get(protectRoute(['Admin']), routeValidation.get, UserController.get)

  /**
  * Update a user
  *
  * @name Update User
  * @path {PUT} /api/users/:userId
  * @auth This route requires a token with Admin permission.
  * If authentication fails it will return a 401 error.
  * @body {object} User is an object containing the new user fields.
  * @params {String} :userId is the unique identifier for the user.
  */
  .put(protectRoute(['Admin']), routeValidation.update, UserController.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(protectRoute(['Admin']), routeValidation.remove, UserController.remove);

router.route('/:userId/permissions')
  /** GET /api/users/:userId/permissions - Add user permission */
  .get(protectRoute(['Admin']), routeValidation.getPermissions, UserController.getPermissions)

  /** GET /api/users/:userId/permissions - get user permissions */
  .post(protectRoute(['Admin']), routeValidation.addPermission, UserController.addPermission)

  /** DELETE /api/users/:userId/permissions - Delete user permission */
  .delete(protectRoute(['Admin']), routeValidation.removePermission, UserController.removePermission);
module.exports = router;
