const DbService = require('../helpers/baseDbService');
const models = require('../../config/models');

/**
 * Creates a new ThingService.
 * @extends DbService
 */
class ThingService extends DbService {}

module.exports = new ThingService('Thing', models);
