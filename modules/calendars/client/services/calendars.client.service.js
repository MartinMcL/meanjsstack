// Calendars service used to communicate Calendars REST endpoints
(function () {
  'use strict';

  angular
    .module('calendars')
    .factory('CalendarFactory', CalendarFactory);
  function CalendarFactory($http) {
    function getEvents() {
      return $http({
        method: 'GET',
        url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/events?apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA'
      });
    }
    return {
      getEvents: getEvents
    };
  }
}());

