'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Collegemap Schema
 */
var CollegemapSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Collegemap name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Collegemap', CollegemapSchema);
