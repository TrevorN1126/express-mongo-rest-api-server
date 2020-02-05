/**
 * @file user.service.js Service for the user component
 */
const UserModel = require('./user.model');

/**
 * @classdesc Creates a new UserService.
 *
 */
class UserService {

  /**
   * Create a new user
   * @params {object} user - Object representing a new user
   * @return {object} user
   */
  async Create(user) {
    try {

      const userRecord = await UserModel.create(user);
      return { user: userRecord };

    } catch (e) {
      return e;
    }

  }

  /**
   * Get a user
   * @params {string} userId - The _id of the user
   * @return {object} user
   */
  async GetUser(userId){
    let user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');
    return user;

  }

  /**
   * Update a user
   * @params {string} userId - The _id of the user
   * @params {object} user - TThe new values for the user
   * @return {object} user
   */
  async Update(userId, newValues) {

    let user = await UserModel.findById(userId);
    if (!user) return res.json({ message: 'User not found' });
    Object.assign(user, newValues);
    await user.save();
    return user;

  }

  /**
   * Get a list of all users
   * @return {object[]} user - An array of users
   */
  async List(){
    let users = await UserModel.find({});
    return users;
  }

  async Remove(userId){
    let userRemoved = await UserModel.remove({ _id: userId });
    return userRemoved;
  }

}

module.exports = UserService;
