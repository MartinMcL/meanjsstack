'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Studentmail = mongoose.model('Studentmail'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Studentmail
 */
exports.create = function(req, res) {
  var studentmail = new Studentmail(req.body);
  studentmail.user = req.user;

  studentmail.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(studentmail);
    }
  });
};

/**
 * Show the current Studentmail
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var studentmail = req.studentmail ? req.studentmail.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  studentmail.isCurrentUserOwner = req.user && studentmail.user && studentmail.user._id.toString() === req.user._id.toString();

  res.jsonp(studentmail);
};

/**
 * Update a Studentmail
 */
exports.update = function(req, res) {
  var studentmail = req.studentmail;

  studentmail = _.extend(studentmail, req.body);

  studentmail.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(studentmail);
    }
  });
};

/**
 * Delete an Studentmail
 */
exports.delete = function(req, res) {
  var studentmail = req.studentmail;

  studentmail.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(studentmail);
    }
  });
};

/**
 * List of Studentmails
 */
exports.list = function(req, res) {
  Studentmail.find().sort('-created').populate('user', 'displayName').exec(function(err, studentmails) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(studentmails);
    }
  });
};

/**
 * Studentmail middleware
 */
exports.studentmailByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Studentmail is invalid'
    });
  }

  Studentmail.findById(id).populate('user', 'displayName').exec(function (err, studentmail) {
    if (err) {
      return next(err);
    } else if (!studentmail) {
      return res.status(404).send({
        message: 'No Studentmail with that identifier has been found'
      });
    }
    req.studentmail = studentmail;
    next();
  });
};
