const express = require('express');
const routeValidation = require('./user.validate');
const UserController = require('./user.controller');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(protectRoute(['Admin']), UserController.list)

  /** POST /api/users - Create new user */
  .post(protectRoute(['Admin']), routeValidation.create, UserController.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(protectRoute(['Admin']), routeValidation.get, UserController.get)

  /** PUT /api/users/:userId - Update user */
  .put(protectRoute(['Admin']), routeValidation.update, UserController.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(protectRoute(['Admin']), routeValidation.remove, UserController.remove);

module.exports = router;
