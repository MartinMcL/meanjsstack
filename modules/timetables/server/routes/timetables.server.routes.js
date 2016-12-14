'use strict';

/**
 * Module dependencies
 */
var timetablesPolicy = require('../policies/timetables.server.policy'),
  timetables = require('../controllers/timetables.server.controller');

module.exports = function(app) {
  // Timetables Routes
  app.route('/api/timetables').all(timetablesPolicy.isAllowed)
    .get(timetables.list)
    .post(timetables.create);

  app.route('/api/timetables/:timetableId').all(timetablesPolicy.isAllowed)
    .get(timetables.read)
    .put(timetables.update)
    .delete(timetables.delete);

  // Finish by binding the Timetable middleware
  app.param('timetableId', timetables.timetableByID);
};
