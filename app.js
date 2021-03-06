const express = require('express');
const logger = require('morgan');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const { errors } = require('celebrate');
const commonMiddleware = require('./config/common-middleware');

const config = require('./config/config');
const winstonInstance = require('./config/winston');
const MongoServer = require('./config/db');
const routes = require('./config/routes');

const APIError = require('./server/helpers/APIError');

// Initiate Mongo Server
MongoServer.initiate();

// Create Express App
const app = express();

/**
* Logging
*/
if (config.env === 'development') {
  app.use(logger('dev'));
}

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

/**
* Common Middleware
*/
app.use(commonMiddleware);

/**
* Routes Middleware
* mount all api routes on /api path
*/
app.use('/api', routes);

/**
* Error Handling
*/
// handle celebrate validation errors responds {statusCode:400, message:'what is missing'}
app.use(errors());

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  });
});

module.exports = app;
