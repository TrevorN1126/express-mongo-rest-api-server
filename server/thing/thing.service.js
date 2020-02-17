const DbService = require('../helpers/baseDbService');
const ThingModel = require('./thing.model');

/**
 * Creates a new ThingService.
 * @class
 */
 class ThingService extends DbService {
   constructor(model) {
     super(model);
   }
 }

module.exports = new ThingService(ThingModel);
