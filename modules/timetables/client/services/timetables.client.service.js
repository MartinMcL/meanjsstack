// Timetables service used to communicate Timetables REST endpoints
(function () {
  'use strict';

  angular
    .module('timetables')
    .factory('TimetablesService', TimetablesService);


  function TimetablesService($http) {
    function getTimetable(user) {
      return $http({
        method: 'GET',
        url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/departments?q={"courses.courseName": "' + user.coursename + '"}&apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA'
      });
    }
    return {
      getTimetable: getTimetable
    };
  }
}());
