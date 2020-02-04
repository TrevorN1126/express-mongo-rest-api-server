const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      permissions: Joi.array().items(Joi.string().required())
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string(),
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  createThing: {
    body: {
      name: Joi.string().required()
    }
  }
};
