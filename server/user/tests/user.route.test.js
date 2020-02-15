const mongoose = require('mongoose');
const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require('../../../app');

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

describe('## User APIs', () => {
  let admin = {
    username: 'TestAdmin',
    password: 'password',
    id: '',
    token: 'Bearer '
  };

  let newUser = {
    username: 'newTestUser',
    password: 'password',
    permissions: ['user']
  };

  let updateUser = {
    username: 'newTestUser1',
    password: 'newpassword',
    permissions: ['admin']
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

  describe('# GET /api/users', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
        .get('/api/users')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should get all users', (done) => {
      request(app)
        .get('/api/users')
        .set('Authorization', admin.token)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });


  describe('# POST /api/users', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
        .post('/api/users')
        .send(newUser)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should create a new user', (done) => {
      request(app)
        .post('/api/users')
        .set('Authorization', admin.token)
        .send(newUser)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.user.username).to.equal(newUser.username);
          newUser = res.body.user;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/users/:userId', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
        .get(`/api/users/${newUser._id}`)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should get user details', (done) => {
      request(app)
        .get(`/api/users/${newUser._id}`)
        .set('Authorization', admin.token)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(newUser.username);
          done();
        })
        .catch(done);
    });

    it('should report error with message - User Not Found, when user does not exists', (done) => {
      request(app)
        .get('/api/users/56c787ccc67fc16ccc1a5e92')
        .set('Authorization', admin.token)
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('User Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/users/:userId', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
        .put(`/api/users/${newUser._id}`)
        .send(updateUser)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should update user details', (done) => {
      request(app)
        .put(`/api/users/${newUser._id}`)
        .set('Authorization', admin.token)
        .send(updateUser)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(updateUser.username);
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/users/', () => {
    it('should report an error - Unauthorized', (done) => {
      request(app)
        .delete(`/api/users/${newUser._id}`)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('should delete a user', (done) => {
      request(app)
        .delete(`/api/users/${newUser._id}`)
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
