const mongoose = require('mongoose');
const config = require('./config');
const debug = require('debug')('express-rest-api-server:app');
const util = require('util');


const InitiateMongoServer = async () => {
  try {
    // connect to mongo db
    const mongoUri = config.mongo.host;
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('error', () => {
      throw new Error(`unable to connect to database: ${mongoUri}`);
    });
    // print mongoose logs in dev env
    if (config.mongooseDebug) {
      mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
      });
    }
  } catch (e) {
    throw e;
  }
};

module.exports = InitiateMongoServer;
