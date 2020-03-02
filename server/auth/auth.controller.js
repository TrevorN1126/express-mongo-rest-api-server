/**
* Controller for the auth component
* @module Auth Controller
*/

const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const AuthService = require('./auth.service');


/**
* Returns jwt token if username is stored in the databse and the password matches
* @param req
* @param res
* @param next
* @returns {*}
*/
async function login(req, res, next) {
  const { username } = req.body;
  const { password } = req.body;

  try {
    const userAuth = await AuthService.Login(username, password);
    if (!userAuth.success) throw new APIError(`Authentication failed. ${userAuth.message}`, httpStatus.UNAUTHORIZED, true);
    return res.json(userAuth);
  } catch (e) {
    return next(e);
  }
}

/**
* This is a protected route. Will return random number only if jwt token is provided in header.
* @param req
* @param res
* @returns {*}
*/
function getRandomNumber(req, res) {
  return res.json({
    num: Math.random() * 100
  });
}


module.exports = { login, getRandomNumber };
