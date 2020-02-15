const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect, assert } = chai;

const MongoServer = require("../../../config/db"); //Todo: fix dot dot hell
const ThingService = require('../thing.service');
//
// // Initiate Mongo Server
// MongoServer.initiate();
//
describe('## Thing Service', () => {

  describe('# Test test', () => {
    it('It shoudl do something', (done) => {
      setImmediate(done);
    });
  });


});
//
// MongoServer.close();
