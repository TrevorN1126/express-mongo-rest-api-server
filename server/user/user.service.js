const DbService = require('../helpers/baseDbService');
const models = require('../../config/models');

/**
* Creates a new UserService.
* @extends DbService
*/
class UserService extends DbService {
  /**
   * Get the users permissions
   * @params {string} userId - the _id of the user
   * @return {Array|Error} returns an array of strings representing the users
   * permissions or an Error
   */
  async GetUserPermissions(userId) {
    try {
      const user = await this.model.findById(userId, 'permissions');
      if (!user) throw new Error('User not found.');
      return user.permissions
    } catch (e) {
      return e;
    }
  }

  /**
   * Add a permissions to a user
   * @params {string} userId - the _id of the user
   * @params {string} - The name of the permission to add
   * @return {object|Error} returns the new permission
   */
  async AddUserPermission(userId, permission) {
    try {
      const user = await this.model.findById(userId, 'permissions');
      if (!user) throw new Error('User not found.');
      user.permissions.push(permission);
      return user;
    } catch (e) {
      return e;
    }
  }

  /**
   * remove a permissions from a user
   * @params {string} userId - the _id of the user
   * @params {string} - The name of the permission to remove
   * @return {object|Error} returns the user or error
   */
  async RemoveUserPermission(userId, permission) {
    try {
      const user = await this.model.findById(userId);
      if (!user) throw new Error('User not found.');
      user.permissions.pull(permission);
      return user;
    } catch (e) {
      return e;
    }
  }

}

module.exports = new UserService('User', models);
