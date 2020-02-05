const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const UserController = require('./user.controller');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router(); // eslint-disable-line new-cap

const UserControllerInstance = new UserController();

router.route('/')
  /** GET /api/users - Get list of users */
  .get(protectRoute(['admin']), UserControllerInstance.list)

  /** POST /api/users - Create new user */
  .post(protectRoute(['admin']), validate(paramValidation.createUser), UserControllerInstance.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(protectRoute(['admin']), UserControllerInstance.get)

  /** PUT /api/users/:userId - Update user */
  .put(protectRoute(['admin']), validate(paramValidation.updateUser), UserControllerInstance.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(protectRoute(['admin']), UserControllerInstance.remove);

module.exports = router;
