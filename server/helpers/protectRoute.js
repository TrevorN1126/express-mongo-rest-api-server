const expressJwt = require('express-jwt');
const config = require('../../config/config');

const protectRoute = expressJwt({ secret: config.jwtSecret });

module.exports = protectRoute;
