const mongoose = require('mongoose');
const debug = require('debug')('express-mongodb-rest-api-server:db');
const util = require('util');
const config = require('./config');
const logger = require('./winston');

class MongoServer {
  static initiate() {
    // connect to mongo db
    const mongoUri = config.mongo.host;
    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    mongoose.connection.once('open', () => {
      logger.info(`Mongoose default connection is open to ${mongoUri}`);
    });
    mongoose.connection.on('error', () => {
      throw new Error(`unable to connect to database: ${mongoUri}`);
    });
    // print mongoose logs in dev env
    if (config.mongooseDebug) {
      mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
      });
    }
  }

  static close() {
    mongoose.disconnect();
    mongoose.connection.on('disconnected', () => {
      logger.info('Connection Closed');
    });
  }
}


module.exports = MongoServer;
