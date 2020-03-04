const express = require('express');
const routeValidation = require('./thing.validate');
const ThingController = require('./thing.controller');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/things - Get list of things */
  .get(ThingController.list)

  /** POST /api/things - Create new thing */
  .post(protectRoute([['User'], ['Admin']]), routeValidation.create, ThingController.create);

router.route('/:thingId')
  /** GET /api/things/:thingId - Get thing */
  .get(routeValidation.get, ThingController.get)

  /** PUT /api/things/:thingId - Update thing */
  .put(protectRoute(['Admin']), routeValidation.update, ThingController.update)

  /** DELETE /api/things/:thingId - Delete thing */
  .delete(protectRoute(['Admin']), routeValidation.remove, ThingController.remove);

module.exports = router;
