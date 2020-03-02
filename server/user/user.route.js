const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const UserController = require('./user.controller');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(protectRoute(['Admin']), UserController.list)

  /** POST /api/users - Create new user */
  .post(protectRoute(['Admin']), validate(paramValidation.createUser), UserController.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(protectRoute(['Admin']), UserController.get)

  /** PUT /api/users/:userId - Update user */
  .put(protectRoute(['Admin']), validate(paramValidation.updateUser), UserController.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(protectRoute(['Admin']), UserController.remove);

module.exports = router;
