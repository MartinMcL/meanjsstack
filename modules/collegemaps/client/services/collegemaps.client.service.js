// Collegemaps service used to communicate Collegemaps REST endpoints
(function () {
  'use strict';

  angular
    .module('collegemaps')
    .factory('CollegemapsService', CollegemapsService);

  CollegemapsService.$inject = ['$resource'];

  function CollegemapsService($resource) {
    return $resource('api/collegemaps/:collegemapId', {
      collegemapId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
