const express = require('express');
// const expressJwt = require('express-jwt');
// const config = require('../../config/config');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');
const protectRoute = require('../middleware/protectRoute');


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  // .get(protectRoute(['admin']), userCtrl.list)
  // .get(expressJwt({ secret: config.jwtSecret }), userCtrl.list)
  .get(protectRoute(['admin']), userCtrl.list)

  /** POST /api/users - Create new user */
  .post(protectRoute(['admin']), validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(protectRoute(['admin']), userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(protectRoute(['admin']), validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(protectRoute(['admin']), userCtrl.remove);

module.exports = router;
