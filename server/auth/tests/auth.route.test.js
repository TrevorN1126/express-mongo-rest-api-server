const request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;
const app = require('../../../app');

chai.config.includeStack = true;

describe('## Auth Routes', () => {
  const validUserCredentials = {
    username: 'TestUser',
    password: 'password'
  };

  const notAUserCredentials = {
    username: 'notAUserCredentials',
    password: 'IDontKnow'
  };

  const invalidCredentials = {
    username: 'justAUserWithoutAPassword'
  };

  let jwtToken = 'Bearer ';

  describe('# POST /api/auth/login', () => {
    it('It should return Authentication error', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(notAUserCredentials)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Authentication failed. User not found.');
          done();
        })
        .catch(done);
    });

    it('It should return validation error', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(invalidCredentials)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"password" is required');
          done();
        })
        .catch(done);
    });

    it('It should get valid JWT token', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(validUserCredentials)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.have.property('success').to.equal(true);
          expect(res.body).to.have.property('message').to.equal('Authentication successfull');
          expect(res.body).to.have.property('token');
          jwtToken += res.body.token;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/auth/random-number', () => {
    it('It should fail to get random number because of missing Authorization', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('It should fail to get random number because of wrong token', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .set('Authorization', 'Bearer inValidToken')
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        })
        .catch(done);
    });

    it('It should get a random number', (done) => {
      request(app)
        .get('/api/auth/random-number')
        .set('Authorization', jwtToken)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.num).to.be.a('number');
          done();
        })
        .catch(done);
    });
  });
});
