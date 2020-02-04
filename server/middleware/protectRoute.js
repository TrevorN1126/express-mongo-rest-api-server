const config = require('../../config/config');
const expressJwt = require('express-jwt');
const guard = require('express-jwt-permissions')({
  requestProperty: 'user.user',
  permissionsProperty: 'permissions'
});

// middleware to decode token and get check the permissions attached to the user
module.exports = function (permissionsArray) {
  if (permissionsArray) {
    return [expressJwt({ secret: config.jwtSecret }), guard.check(permissionsArray)];
  }
  return expressJwt({ secret: config.jwtSecret });
};
