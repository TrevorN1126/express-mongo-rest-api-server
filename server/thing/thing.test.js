const mongoose = require('mongoose');
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require('../../app');

chai.config.includeStack = true;


/**
 * root level hooks
 */

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Thing APIs', () => {
  let admin = {
    username: 'TestAdmin',
    password: 'password',
    id: '',
    token: 'Bearer '
  };

  let newThing = {
    name: 'newTestThing',
    description: 'description of newTestThing'
  };

  let updateThing = {
    name: 'newTestThing1',
    description: 'description of newTestThing1'
  };

  // jwtToken = 'Bearer ';

  before(async () => {
    await request(app)
      .post('/api/auth/login')
      .send(admin)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).to.have.property('token');
        admin.token += res.body.token;
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

    it('should create a new thing', (done) => {
      request(app)
        .post('/api/things')
        .set('Authorization', admin.token)
        .send(newThing)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.thing.thingname).to.equal(newThing.thingname);
          newThing = res.body.thing;
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
          expect(res.body.thingname).to.equal(newThing.thingname);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Thing Not Found, when thing does not exists', (done) => {
      request(app)
        .get('/api/things/56c787ccc67fc16ccc1a5e92')
        .set('Authorization', admin.token)
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Thing Not Found');
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
        .set('Authorization', admin.token)
        .send(updateThing)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.thingname).to.equal(updateThing.thingname);
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
        .set('Authorization', admin.token)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.ok).to.equal(1);
          done();
        })
        .catch(done);
    });
  });
});
