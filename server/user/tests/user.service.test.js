const chai = require('chai');

const { expect } = chai;
const UserService = require('../user.service');

let userTest = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'TestUser1',
  password: 'password',
  permissions: ['User']
};

const userBadTest = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'BadTestUser1',
};

const userUpdated = {
  firstName: 'John2',
  lastName: 'Doe2',
  username: 'TestUser2',
  password: 'password'
};

describe('## User Service', () => {
  describe('# Create', () => {
    it('It should throw an error - ', async () => {
      const newBadUser = await UserService.Create(userBadTest);
      expect(newBadUser).to.be.instanceOf(Error);
    });
    it('It should create a new user', async () => {
      const newUser = await UserService.Create(userTest);
      // test pre save hook for user model before overwriting local newUser
      expect(newUser.password).to.not.equal(userTest.password);
      expect(newUser.username).to.equal(userTest.username);
      userTest = newUser;
    });
  });

  describe('# List', () => {
    it('It should get a list of all users', async () => {
      const allUsers = await UserService.List();
      expect(allUsers).to.be.an('array');
      expect(allUsers[0]).to.be.an('object');
    });
  });

  describe('# GetItem', () => {
    it('It should return an Error - User not found. ', async () => {
      const gotNotAUser = await UserService.GetItem('5e597fadf826ff50d84939ae');
      expect(gotNotAUser.message).to.equal('User not found.');
    });
    it('It should get a user by id', async () => {
      const gotUser = await UserService.GetItem(userTest._id);
      expect(gotUser.username).to.equal(userTest.username);
    });
  });

  describe('# User Permissions', () => {
    it('It should add a permission to a user ', async () => {
      const newUserPermission = await UserService.AddUserPermission(userTest._id, 'Admin'); // eslint-disable-line max-len
      expect(newUserPermission._id.equals(userTest._id)).to.equal(true);
      expect(newUserPermission.permissions).to.include('Admin');
    });
    it('It should get a users permissions', async () => {
      const permissions = await UserService.GetUserPermissions(userTest._id);
      expect(permissions).to.be.an('array');
      expect(permissions).to.include('User');
    });
    it('It should remove a permission from a user', async () => {
      const removedPermission = await UserService.RemoveUserPermission(userTest._id, 'Admin'); // eslint-disable-line max-len
      expect(removedPermission.permissions).to.not.include('Admin');
      expect(removedPermission.permissions).to.include('User');
    });
  });

  describe('# Update', () => {
    it('It should update a user with new values', async () => {
      const updatedUser = await UserService.Update(userTest._id, userUpdated);
      expect(updatedUser.username).to.equal(userUpdated.username);
    });
    it('It should return an Error - User not found.', async () => {
      const updatedNonUser = await UserService.Update('5e597fadf826ff50d84939ae', userUpdated);
      expect(updatedNonUser.message).to.equal('User not found.');
    });
  });

  describe('# Remove', () => {
    it('It should delete a user', async () => {
      const removedUser = await UserService.Remove(userTest._id);
      expect(removedUser.n).to.equal(1);
    });
    it('It should return an Error - User not found.', async () => {
      const removedNonUser = await UserService.Remove('5e597fadf826ff50d84939ae');
      expect(removedNonUser.message).to.equal('User not found.');
    });
  });
});
