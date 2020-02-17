const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect, assert } = chai;

const MongoServer = require("../../../config/db"); //Todo: fix dot dot hell
const ThingService = require('../thing.service');
//
// // Initiate Mongo Server
// MongoServer.initiate();
//
const badThing = {
  description: 'Thing without the required name'
};
let goodThing = {
  name: 'The Good Thing',
  description: 'The Good Thing Description'
};
let updatedGoodThing = {
  name: 'The Updated Good Thing',
  description: 'The Updated Good Thing Description'
};
const fakeId = '5e48d39cb397c73f80941cde'

describe('## Thing Service', () => {

  describe('# List', () => {
    it('It should return a list of things', async function() {
      const list = await ThingService.List();
      expect(list).to.be.an('array');
      expect(list[0]).to.be.an('object');
    });
  });

  describe('# Create', () => {
    it('It should return a validation error', async function() {
      const newThing = await ThingService.Create(badThing);
      expect(newThing.message).to.equal('Thing validation failed: name: Path `name` is required.');
    });

    it('It should create a new thing', async function() {
      const newThing = await ThingService.Create(goodThing);
      expect(newThing).to.be.an('object');
      expect(newThing.name).to.equal(goodThing.name);
      goodThing = newThing;
    });

  });

  describe('# Get', () => {
    it('It should return a thing ', async function() {
      const thing = await ThingService.GetById(goodThing._id);
      expect(thing).to.be.an('object');
      expect(thing.name).to.equal(goodThing.name);
    });
    
    it('It should return an error - Item not found', async function() {
      const thing = await ThingService.GetById(fakeId);
      expect(thing.message).to.equal('Item not found')
    });
  });

  describe('# update', () => {
    it('It should update a thing ', async function() {
      const thing = await ThingService.Update(goodThing._id, updatedGoodThing);
      expect(thing).to.be.an('object');
      expect(thing.name).to.equal(updatedGoodThing.name);
    });
  });

  describe('# remove', () => {
    it('It should remove an thing by id ', async function() {
      const removed = await ThingService.Remove(goodThing._id);
      expect(removed.ok).to.equal(1);
    });
  });


});
