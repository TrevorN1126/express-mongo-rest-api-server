const mongoose = require('mongoose');

const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const SALT_WORK_FACTOR = 10;

/**
* User Schema
*/
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  password: {
    type: String,
    required: true
  },
  permissions: {
    type: [String],
    enum: ['Admin', 'User']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
* Add your
* - pre-save hooks
* - validations
* - virtuals
UserSchema.pre('save', function save(next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (errSalt, salt) => {
    if (errSalt) return next(errSalt);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (errHash, hash) => {
      if (errHash) return next(errHash);

      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});
*/
UserSchema.pre('save', async function save(next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  // generate a salt and hash
  const hash = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
  // override the cleartext password with the hashed one
  user.password = hash;
  return next();
});

UserSchema.plugin(uniqueValidator);

/**
* Methods
*/
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

/**
* Statics
*/
UserSchema.statics = {
  /**
  * Get user
  * @param {ObjectId} id - The objectId of user.
  * @returns {Promise<User, APIError>}
  */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
  * List users in descending order of 'createdAt' timestamp.
  * @param {number} skip - Number of users to be skipped.
  * @param {number} limit - Limit number of users to be returned.
  * @returns {Promise<User[]>}
  */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
* @typedef User
*/
module.exports = mongoose.model('User', UserSchema);
