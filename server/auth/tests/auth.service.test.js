const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect, assert } = chai;

const AuthService = require('../auth.service');

const username = 'TestAdmin';
const password = 'password';

describe('## Auth Service', () => {

  describe('# Login', () => {
    it('It should return an object with success, user and token properties', async function() {
      const auth = await AuthService.Login(username, password);
      // console.log(auth);
      expect(auth).to.have.property('success');
      expect(auth).to.have.property('token');
      expect(auth).to.have.property('user');

    });
  });



});
