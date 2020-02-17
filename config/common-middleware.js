const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cors = require('cors');

module.exports = [
  bodyParser.json(), // parse body params and attache them to req.body
  bodyParser.urlencoded({ extended: true }),
  cookieParser(),
  compress(),
  methodOverride(),
  helmet(), // secure apps by setting various HTTP headers
  cors(), // enable CORS - Cross Origin Resource Sharing
];
