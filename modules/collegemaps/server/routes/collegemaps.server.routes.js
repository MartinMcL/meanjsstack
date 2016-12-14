'use strict';

/**
 * Module dependencies
 */
var collegemapsPolicy = require('../policies/collegemaps.server.policy'),
  collegemaps = require('../controllers/collegemaps.server.controller');

module.exports = function(app) {
  // Collegemaps Routes
  app.route('/api/collegemaps').all(collegemapsPolicy.isAllowed)
    .get(collegemaps.list)
    .post(collegemaps.create);

  app.route('/api/collegemaps/:collegemapId').all(collegemapsPolicy.isAllowed)
    .get(collegemaps.read)
    .put(collegemaps.update)
    .delete(collegemaps.delete);

  // Finish by binding the Collegemap middleware
  app.param('collegemapId', collegemaps.collegemapByID);
};
