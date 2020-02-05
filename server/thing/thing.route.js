const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const ThingController = require('./thing.controller');
const protectRoute = require('../middleware/protectRoute');


const router = express.Router(); // eslint-disable-line new-cap

const ThingControllerInstance = new ThingController();

router.route('/')
  /** GET /api/things - Get list of things */
  .get(ThingControllerInstance.list)

  /** POST /api/things - Create new thing */
  .post(protectRoute([['user'], ['admin']]), validate(paramValidation.createThing), ThingControllerInstance.create);

router.route('/:thingId')
  /** GET /api/things/:thingId - Get thing */
  .get(ThingControllerInstance.get)

  /** PUT /api/things/:thingId - Update thing */
  .put(protectRoute(['admin']), ThingControllerInstance.update)

  /** DELETE /api/things/:thingId - Delete thing */
  .delete(protectRoute(['admin']), ThingControllerInstance.remove);

module.exports = router;
