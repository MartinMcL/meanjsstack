'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Studentmail Schema
 */
var StudentmailSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Studentmail name',
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

mongoose.model('Studentmail', StudentmailSchema);
