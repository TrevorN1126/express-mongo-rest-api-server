/**
 * Creates a new ItemService.
 * @class
 */
class DbService {
  /**
   * Creates a database service with basic CRUD functions
   * @param {string} componentName - The name of the component being used
   * @param {object} models - All database models
   */
  constructor(componentName, models) {
    this.componentName = componentName;
    this.models = models;
    this.model = models[componentName];
  }

  /**
   * Create a new item
   * @params {object} item - Object representing a new item
   * @return {object|Error} item - return the item or an Error with the error message
   */
  async Create(item) {
    try {
      const itemRecord = await this.model.create(item);
      return itemRecord;
    } catch (e) {
      return e;
    }
  }

  /**
   * Get a item
   * @params {string} itemId - The _id of the item
   * @return {object|Error} item
   */
  async GetItem(itemId) {
    try {
      const item = await this.model.findById(itemId);
      if (!item) throw new Error(`${this.componentName} not found.`);
      return item;
    } catch (e) {
      return e;
    }
  }

  /**
   * Update a item
   * @params {string} itemId - The _id of the item
   * @params {object} item - TThe new values for the item
   * @return {object|Error} item
   */
  async Update(itemId, newValues) {
    try {
      const item = await this.model.findById(itemId);
      if (!item) throw new Error(`${this.componentName} not found.`);
      Object.assign(item, newValues);
      await item.save();
      return item;
    } catch (e) {
      return e;
    }
  }

  /**
   * Get a list of all items
   * @return {object[]} item - An array of items
   */
  async List() {
    try {
      const items = await this.model.find({});
      return items;
    } catch (e) {
      return e;
    }
  }

  /**
   * Remove an item
   * @params {string} itemId - The _id of the item
   * @return {number|Error} 1 or error - "Item not found."
   */
  async Remove(itemId) {
    try {
      const itemRemoved = await this.model.remove({
        _id: itemId
      });
      if (itemRemoved.n === 0) throw new Error(`${this.componentName} not found.`);
      return itemRemoved;
    } catch (e) {
      return e;
    }
  }
}

module.exports = DbService;
