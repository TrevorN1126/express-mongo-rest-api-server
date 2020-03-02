/**
* Controller for the user component
* @module User Controller
*/

const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const UserService = require('./user.service');

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @property {string[]} req.body.permissions - Array of strings for the permissions
 * @returns {User}
 */
async function create(req, res, next) {
  const newUser = req.body;

  try {
    const savedUser = await UserService.Create(newUser);

    // Example of other services and logic that can be called during hit to endpoint
    // const EmailServiceInstance = new EmailService();
    // await EmailServiceInstance.startSignupSequence(savedUser);

    return res.json(savedUser);
  } catch (e) {
    return next(e);
  }
}

/**
 * Get an existing user
 * @property {string} req.params.userId - The _id of user.
 * @returns {User}
 */
async function get(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await UserService.GetItem(userId);
    if (user instanceof Error) {
      throw new APIError(user.message, httpStatus.NOT_FOUND, true);
    }
    return res.json(user);
  } catch (e) {
    return next(e);
  }
}

/**
 * Update existing user
 * @property {string} req.params.userId - The _id of user.
 * @property {object} req.body - Object containing new values for the user.
 * @returns {User}
 */
async function update(req, res, next) {
  const { userId } = req.params;
  const newValues = req.body;

  try {
    const updatedUser = await UserService.Update(userId, newValues);
    if (updatedUser instanceof Error) {
      throw new APIError(updatedUser.message, httpStatus.NOT_FOUND, true);
    }
    return res.json(updatedUser);
  } catch (e) {
    return next(e);
  }
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function list(req, res, next) {
  try {
    const userList = await UserService.List();
    return res.json(userList);
  } catch (e) {
    return next(e);
  }
}

/**
 * Delete user.
 * @property {string} req.params.userId - The _id of user.
 * @returns {User}
 */
async function remove(req, res, next) {
  const { userId } = req.params;

  try {
    const userRemoved = await UserService.Remove(userId);
    return res.json(userRemoved);
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  create, get, update, list, remove
};
