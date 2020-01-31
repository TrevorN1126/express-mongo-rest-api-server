const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');

const User = require('../user/user.model');

/**
* Returns jwt token if username is stored in the databse and the password matches
* @param req
* @param res
* @param next
* @returns {*}
*/
function login(req, res, next) {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err;

    if (!user) {
      const error = new APIError('Authentication failed. User not found.', httpStatus.UNAUTHORIZED, true);
      return next(error);
    }
    // Check if password matches
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        // Create token if the password matched and no error was thrown
        jwt.sign({ user }, config.jwtSecret, {
          expiresIn: '2 days'
        }, (err, token) => {
          if (err) next(err);
          res.json({
            success: true,
            message: 'Authentication successfull',
            user: user,
            token
          });
        });
      } else {
        const error = new APIError('Authentication failed. Passwords did not match.', httpStatus.UNAUTHORIZED, true);
        return next(error);
      }
    });
  });
}

/**
* This is a protected route. Will return random number only if jwt token is provided in header.
* @param req
* @param res
* @returns {*}
*/
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

module.exports = { login, getRandomNumber };
