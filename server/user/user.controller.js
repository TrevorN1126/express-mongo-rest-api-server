
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
  let UserServiceInstance = new UserService();
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    permissions: req.body.permissions
  };

  try {
    const savedUser = await UserServiceInstance.Create(newUser);

    // Example of other services and logic that can be called during hit to endpoint
    // const EmailServiceInstance = new EmailService();
    // await EmailServiceInstance.startSignupSequence(savedUser);

    return res.json( savedUser );
  } catch (e) {
    return res.json(e)
  }

}

/**
 * Get an existing user
 * @property {string} req.params.userId - The _id of user.
 * @returns {User}
 */
async function get(req, res, next) {
  let UserServiceInstance = new UserService();
  const userId = req.params.userId;

  try {
    const user = await UserServiceInstance.GetUser(userId);
    return res.json(user);
  } catch (e) {
    const error = new APIError('User Not Found', httpStatus.NOT_FOUND, true);
    return next(error);
  }

}

/**
 * Update existing user
 * @property {string} req.params.userId - The _id of user.
 * @property {object} req.body - Object containing new values for the user.
 * @returns {User}
 */
async function update(req, res, next) {
  let UserServiceInstance = new UserService();
  const userId = req.params.userId;
  const newValues = req.body;

  try {
    const updatedUser = await UserServiceInstance.Update(userId, newValues);
    return res.json(updatedUser);
  } catch (e) {
    return res.json(e)
  }

}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function list(req, res, next) {
  let UserServiceInstance = new UserService();
  try {
    const userList = await UserServiceInstance.List();
    return res.json(userList);
  } catch (e) {
    return res.json(e)
  }

}

/**
 * Delete user.
 * @property {string} req.params.userId - The _id of user.
 * @returns {User}
 */
async function remove(req, res, next) {
  let UserServiceInstance = new UserService();
  const userId = req.params.userId;

  try {
    const userRemoved = await UserServiceInstance.Remove(userId);
    return res.json(userRemoved);
  } catch (e) {
    return res.json(e)
  }

}

module.exports = { create, get, update, list, remove};
