const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const UserModel = require('../user/user.model');

/**
* Creates a new ThingService.
* @class
*/
class AuthService {
  constructor(model) {
    this.model = model;
  }

  async Login(username, password) {
    try {
      // Find the User
      const user = await this.model.findOne({
        username: username
      });
      if (!user) throw Error('User not found.');

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) throw Error("Invalid password.")

      const token = jwt.sign(
        {user},
        config.jwtSecret,
        {expiresIn: '2 days'}
      );
      return {
        success: true,
        message: 'Authentication successfull',
        user: user,
        token: token
      };
    } catch (e) {
      // return a Error message describing the reason
      return e;
    }
  }

}

module.exports = new AuthService(UserModel);
