// const mongoose = require('mongoose');
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require('../../../app');

chai.config.includeStack = true;

describe('## Thing Routes', () => {
  const admin = {
    username: 'TestAdmin',
    password: 'password'
  };

  let adminToken = 'Bearer ';

  let newThing = {
    name: 'newTestThing',
    description: 'description of newTestThing'
  };

  const updateThing = {
    name: 'newTestThing1',
    description: 'description of newTestThing1'
  };

  const badThing = {
    description: 'Thing without the required name'
  };

  before(async () => {
    await request(app)
      .post('/api/auth/login')
      .send(admin)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).to.have.property('token');
        adminToken += res.body.token;
        expect(res.body).to.have.property('user');
        admin.id += res.body.user._id;
      });
  });

  describe('# GET /api/things', () => {
    it('should get all things', (done) => {
      request(app)
        .get('/api/things')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });


  describe('# POST /api/things', () => {
    it('should create a new thing', (done) => {
      request(app)
        .post('/api/things')
        .set('Authorization', adminToken)
        .send(newThing)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(newThing.name);
          newThing = res.body;
          done();
        })
        .catch(done);
    });

    it('should report an error - Unauthorized', (done) => {
      request(app)
        .post('/api/things')
        .send(newThing)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('It should report an Error - "name is required"', (done) => {
      request(app)
        .post('/api/things')
        .set('Authorization', adminToken)
        .send(badThing)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"name" is required');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/things/:thingId', () => {
    it('should get thing details', (done) => {
      request(app)
        .get(`/api/things/${newThing._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(newThing.name);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Thing Not Found, when thing does not exists', (done) => {
      request(app)
        .get('/api/things/56c787ccc67fc16ccc1a5e92')
        .set('Authorization', adminToken)
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Thing not found.');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/things/:thingId', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
        .put(`/api/things/${newThing._id}`)
        .send(updateThing)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should update thing details', (done) => {
      request(app)
        .put(`/api/things/${newThing._id}`)
        .set('Authorization', adminToken)
        .send(updateThing)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(updateThing.name);
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/things/', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
        .delete(`/api/things/${newThing._id}`)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should delete a thing', (done) => {
      request(app)
        .delete(`/api/things/${newThing._id}`)
        .set('Authorization', adminToken)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.ok).to.equal(1);
          done();
        })
        .catch(done);
    });
  });
});
