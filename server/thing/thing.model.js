const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
* Thing Schema
*/
const ThingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
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
*/

/**
* Methods
*/

/**
* Statics
*/


/**
* @typedef Thing
*/
module.exports = mongoose.model('Thing', ThingSchema);
