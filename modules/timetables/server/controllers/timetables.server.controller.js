'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Timetable = mongoose.model('Timetable'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Timetable
 */
exports.create = function(req, res) {
  var timetable = new Timetable(req.body);
  timetable.user = req.user;

  timetable.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(timetable);
    }
  });
};

/**
 * Show the current Timetable
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var timetable = req.timetable ? req.timetable.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  timetable.isCurrentUserOwner = req.user && timetable.user && timetable.user._id.toString() === req.user._id.toString();

  res.jsonp(timetable);
};

/**
 * Update a Timetable
 */
exports.update = function(req, res) {
  var timetable = req.timetable;

  timetable = _.extend(timetable, req.body);

  timetable.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(timetable);
    }
  });
};

/**
 * Delete an Timetable
 */
exports.delete = function(req, res) {
  var timetable = req.timetable;

  timetable.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(timetable);
    }
  });
};

/**
 * List of Timetables
 */
exports.list = function(req, res) {
  Timetable.find().sort('-created').populate('user', 'displayName').exec(function(err, timetables) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(timetables);
    }
  });
};

/**
 * Timetable middleware
 */
exports.timetableByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Timetable is invalid'
    });
  }

  Timetable.findById(id).populate('user', 'displayName').exec(function (err, timetable) {
    if (err) {
      return next(err);
    } else if (!timetable) {
      return res.status(404).send({
        message: 'No Timetable with that identifier has been found'
      });
    }
    req.timetable = timetable;
    next();
  });
};
