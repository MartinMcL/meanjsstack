// Timetables service used to communicate Timetables REST endpoints
(function () {
  'use strict';

  angular
    .module('timetables')
    .factory('TimetablesService', TimetablesService);

  TimetablesService.$inject = ['$resource'];

  function TimetablesService($resource) {
    return $resource('api/timetables/:timetableId', {
      timetableId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
