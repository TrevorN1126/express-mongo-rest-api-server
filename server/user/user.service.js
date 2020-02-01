const UserModel = require('./user.model');

class UserService {

  async Create(user) {
    const userRecord = await UserModel.create(user);
    return { user: userRecord };
  }

  async Update(oldValues, newValues) {
    const updatedUser = await UserModel.updateOne({ username: oldValues.username },  newValues );
    return {user: updatedUser}
  }

}

module.exports = UserService;
