const expressJwt = require('express-jwt');
const config = require('../../config/config');
var guard = require('express-jwt-permissions')({
  requestProperty: 'user.user',
  permissionsProperty: 'permissions'
});

// middleware to decode token and get check the permissions attached to the user
module.exports = function (permissionsArray) {
  return function (req, res, next) {
    expressJwt({ secret: config.jwtSecret });
    guard.check(permissionsArray);
    next()
  }
}
