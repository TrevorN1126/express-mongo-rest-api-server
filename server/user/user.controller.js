const User = require('./user.model');
const UserService = require('./user.service');

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @property {[string]} req.body.permissions - Array of strings for the permissions
 * @returns {User}
 */
async function create(req, res, next) {

  const newUser = {
    username: req.body.username,
    password: req.body.password,
    permissions: req.body.permissions
  };

  // console.log(req.body);

  const UserServiceInstance = new UserService();

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
async function get(req, res) {

  const userId = req.params.userId;

  const UserServiceInstance = new UserService();

  try {
    const user = await UserServiceInstance.GetUser(userId);
    return res.json(user);
  } catch (e) {
    return res.json(e)
  }


}

/**
 * Update existing user
 * @property {string} req.params.userId - The _id of user.
 * @property {object} req.body - Object containing new values for the user.
 * @returns {User}
 */
async function update(req, res, next) {

  const userId = req.params.userId;
  const newValues = req.body;

  const UserServiceInstance = new UserService();

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

  const UserServiceInstance = new UserService();

  try {
    const userList = await UserServiceInstance.List();
    return res.json(userList);
  } catch (e) {
    return res.json(e)
  }


}

/**
 * Delete user.
 * @returns {User}
 */
async function remove(req, res, next) {

  const userId = req.params.userId;

  const UserServiceInstance = new UserService();

  try {
    const userRemoved = await UserServiceInstance.Remove(userId);
    return res.json(userRemoved);
  } catch (e) {
    return res.json(e)
  }

}

module.exports = {
  create, get, update, list, remove
};
