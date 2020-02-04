const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const thingCtrl = require('./thing.controller');
const protectRoute = require('../middleware/protectRoute');


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/things - Get list of things */
  .get( thingCtrl.list )

  /** POST /api/things - Create new thing */
  .post(protectRoute([['user'],['admin']]), validate(paramValidation.createThing), thingCtrl.create);

router.route('/:thingId')
  /** GET /api/things/:thingId - Get thing */
  .get( thingCtrl.get )

  /** PUT /api/things/:thingId - Update thing */
  .put(protectRoute(['admin']), thingCtrl.update)

  /** DELETE /api/things/:thingId - Delete thing */
  .delete(protectRoute(['admin']), thingCtrl.remove);

module.exports = router;
