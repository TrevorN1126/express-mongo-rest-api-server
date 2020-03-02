const expressJwt = require('express-jwt');
const guard = require('express-jwt-permissions')({
  requestProperty: 'user.user',
  permissionsProperty: 'permissions'
});
const config = require('../../config/config');

// middleware to decode token and get check the permissions attached to the user
module.exports = function protectRoute(permissionsArray) {
  if (permissionsArray) {
    return [expressJwt({ secret: config.jwtSecret }), guard.check(permissionsArray)];
  }
  return expressJwt({ secret: config.jwtSecret });
};
