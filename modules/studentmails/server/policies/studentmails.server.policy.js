'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Studentmails Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/studentmails',
      permissions: '*'
    }, {
      resources: '/api/studentmails/:studentmailId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/studentmails',
      permissions: ['get', 'post']
    }, {
      resources: '/api/studentmails/:studentmailId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/studentmails',
      permissions: ['get']
    }, {
      resources: '/api/studentmails/:studentmailId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Studentmails Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Studentmail is being processed and the current user created it then allow any manipulation
  if (req.studentmail && req.user && req.studentmail.user && req.studentmail.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
