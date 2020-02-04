const UserModel = require('./user.model');

class UserService {

  async Create(user) {
    try {

      const userRecord = await UserModel.create(user);
      return { user: userRecord };

    } catch (e) {
      return e;
    }

  }

  async GetUser(userId){
    let user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');
    return user;

  }

  async Update(userId, newValues) {

    let user = await UserModel.findById(userId);
    if (!user) return res.json({ message: 'User not found' });
    Object.assign(user, newValues);
    await user.save();
    return user;

  }

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
