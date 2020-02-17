const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const ThingService = require('./thing.service');

  /**
   * Create new thing
   * @property {string} req.body.name - The name of a thing.
   * @property {string} req.body.description - The description of a thing.
   * @returns {Thing}
   */
  async function create(req, res, next) {
    const newThing = req.body;

    try {
      const savedThing = await ThingService.Create(newThing);
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
  async function get(req, res, next) {
    const thingId = req.params.thingId;

    const thing = await ThingService.GetById(thingId);
    if (thing.message === 'Item not found') {
      const error = new APIError('Thing Not Found', httpStatus.NOT_FOUND, true);
      return next(error);
    }
    return res.json(thing);

  }

  /**
   * Update existing thing
   * @property {string} req.params.thingId - The _id of thing.
   * @property {object} req.body - Object containing new values for the thing.
   * @returns {Thing}
   */
  async function update(req, res, next) {
    const thingId = req.params.thingId;
    const newValues = req.body;

    try {
      const updatedThing = await ThingService.Update(thingId, newValues);
      return res.json(updatedThing);
    } catch (e) {
      const error = new APIError('Thing Not Found', httpStatus.NOT_FOUND, true);
      return next(error);
    }

  }

  /**
   * Get thing list.
   * @returns {Thing[]}
   */
  async function list(req, res, next) {

    try {
      const thingList = await ThingService.List();
      return res.json(thingList);
    } catch (e) {
      return res.json(e)
    }

  }

  /**
   * Delete thing.
   * @returns {Thing}
   */
  async function remove(req, res, next) {
    const thingId = req.params.thingId;

    try {
      const thingRemoved = await ThingService.Remove(thingId);
      return res.json(thingRemoved);
    } catch (e) {
      return res.json(e)
    }

  }


module.exports = { create, get, update, list, remove };
