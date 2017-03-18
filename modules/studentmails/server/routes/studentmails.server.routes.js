'use strict';

/**
 * Module dependencies
 */
var studentmailsPolicy = require('../policies/studentmails.server.policy'),
  studentmails = require('../controllers/studentmails.server.controller');

module.exports = function(app) {
  // Studentmails Routes
  app.route('/api/studentmails').all(studentmailsPolicy.isAllowed)
    .get(studentmails.list)
    .post(studentmails.create);

  app.route('/api/studentmails/:studentmailId').all(studentmailsPolicy.isAllowed)
    .get(studentmails.read)
    .put(studentmails.update)
    .delete(studentmails.delete);

  // Finish by binding the Studentmail middleware
  app.param('studentmailId', studentmails.studentmailByID);
};
