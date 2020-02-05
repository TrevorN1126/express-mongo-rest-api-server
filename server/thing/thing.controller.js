const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const ThingService = require('./thing.service');
const ThingServiceInstance = new ThingService();

/**
 * @classdesc ThingController Class.
 *
 */
class ThingController {

  /**
   * Create new thing
   * @property {string} req.body.name - The name of a thing.
   * @property {string} req.body.description - The description of a thing.
   * @returns {Thing}
   */
  async create(req, res, next) {

    const newThing = {
      name: req.body.name,
      description: req.body.description
    };

    try {
      const savedThing = await ThingServiceInstance.Create(newThing);
      return res.json( savedThing );
    } catch (e) {
      return res.json(e)
    }

  }

  /**
   * Get an existing thing
   * @property {string} req.params.thingId - The _id of thing.
   * @returns {Thing}
   */
  async get(req, res, next) {

    const thingId = req.params.thingId;

    try {
      const thing = await ThingServiceInstance.GetThing(thingId);
      return res.json(thing);
    } catch (e) {
      const error = new APIError('Thing Not Found', httpStatus.NOT_FOUND, true);
      return next(error);
    }

  }

  /**
   * Update existing thing
   * @property {string} req.params.thingId - The _id of thing.
   * @property {object} req.body - Object containing new values for the thing.
   * @returns {Thing}
   */
  async update(req, res, next) {

    const thingId = req.params.thingId;
    const newValues = req.body;

    try {
      const updatedThing = await ThingServiceInstance.Update(thingId, newValues);
      return res.json(updatedThing);
    } catch (e) {
      return res.json(e)
    }

  }

  /**
   * Get thing list.
   * @returns {Thing[]}
   */
  async list(req, res, next) {

    try {
      const thingList = await ThingServiceInstance.List();
      return res.json(thingList);
    } catch (e) {
      return res.json(e)
    }

  }

  /**
   * Delete thing.
   * @returns {Thing}
   */
  async remove(req, res, next) {

    const thingId = req.params.thingId;

    try {
      const thingRemoved = await ThingServiceInstance.Remove(thingId);
      return res.json(thingRemoved);
    } catch (e) {
      return res.json(e)
    }

  }

}


module.exports = ThingController;
