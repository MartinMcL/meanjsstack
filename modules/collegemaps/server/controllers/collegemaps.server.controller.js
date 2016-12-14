'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Collegemap = mongoose.model('Collegemap'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Collegemap
 */
exports.create = function(req, res) {
  var collegemap = new Collegemap(req.body);
  collegemap.user = req.user;

  collegemap.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(collegemap);
    }
  });
};

/**
 * Show the current Collegemap
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var collegemap = req.collegemap ? req.collegemap.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  collegemap.isCurrentUserOwner = req.user && collegemap.user && collegemap.user._id.toString() === req.user._id.toString();

  res.jsonp(collegemap);
};

/**
 * Update a Collegemap
 */
exports.update = function(req, res) {
  var collegemap = req.collegemap;

  collegemap = _.extend(collegemap, req.body);

  collegemap.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(collegemap);
    }
  });
};

/**
 * Delete an Collegemap
 */
exports.delete = function(req, res) {
  var collegemap = req.collegemap;

  collegemap.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(collegemap);
    }
  });
};

/**
 * List of Collegemaps
 */
exports.list = function(req, res) {
  Collegemap.find().sort('-created').populate('user', 'displayName').exec(function(err, collegemaps) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(collegemaps);
    }
  });
};

/**
 * Collegemap middleware
 */
exports.collegemapByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Collegemap is invalid'
    });
  }

  Collegemap.findById(id).populate('user', 'displayName').exec(function (err, collegemap) {
    if (err) {
      return next(err);
    } else if (!collegemap) {
      return res.status(404).send({
        message: 'No Collegemap with that identifier has been found'
      });
    }
    req.collegemap = collegemap;
    next();
  });
};
