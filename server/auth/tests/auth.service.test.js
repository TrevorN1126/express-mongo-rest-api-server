const chai = require('chai'); // eslint-disable-line import/newline-after-import
const { expect } = chai;

const AuthService = require('../auth.service');

const username = 'TestAdmin';
const password = 'password';

describe('## Auth Service', () => {
  describe('# Login', () => {
    it('It should return an Error - User not found', async () => {
      const auth = await AuthService.Login('notAUser', 'password');
      expect(auth.message).to.equal('User not found.');
    });

    it('It should return an Error - Invalid password', async () => {
      const auth = await AuthService.Login(username, '!password');
      expect(auth.message).to.equal('Invalid password.');
    });

    it('It should return an object with success, user and token properties', async () => {
      const auth = await AuthService.Login(username, password);
      expect(auth).to.have.property('success');
      expect(auth).to.have.property('token');
      expect(auth).to.have.property('user');
    });
  });
});
