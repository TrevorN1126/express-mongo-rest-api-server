const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const ThingController = require('./thing.controller');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/things - Get list of things */
  .get(ThingController.list)

  /** POST /api/things - Create new thing */
  .post(protectRoute([['user'], ['admin']]), validate(paramValidation.createThing), ThingController.create);

router.route('/:thingId')
  /** GET /api/things/:thingId - Get thing */
  .get(ThingController.get)

  /** PUT /api/things/:thingId - Update thing */
  .put(protectRoute(['admin']), ThingController.update)

  /** DELETE /api/things/:thingId - Delete thing */
  .delete(protectRoute(['admin']), ThingController.remove);

module.exports = router;
