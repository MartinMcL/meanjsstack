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
    function getUser(user) {
      return $http({
        method: 'GET',
        url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/users?q={"username":"' + user + '"}&apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA&'
      });
    }
    function addUserEvent(user, event) {
      var newData = getUser(user).then(function (response) {
        var userEvent = response.data[0];
        userEvent.calendarEvents.push(event);
        return $http({
          method: 'PUT',
          url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/users?q={"username":"' + user + '"}&apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA&',
          ContentType: 'application/json',
          data: JSON.stringify({ '$set': { 'calendarEvents': userEvent.calendarEvents } })
        });
      });
    }
    function remUserEvent(user, event) {
      var newData = getUser(user).then(function (response) {
        var userEvent = response.data[0];
        var index = -1;
        userEvent.calendarEvents.forEach(function (element) {
          if (event.title === element.title) {
            var elemStartsAtFormatted = new Date(element.startsAt);
            var evenStartsAtFormatted = new Date(event.startsAt.setMonth(event.startsAt.getMonth() + 1));
            if (Date(evenStartsAtFormatted) === Date(elemStartsAtFormatted)) {
              index = userEvent.calendarEvents.indexOf(element);
            }
          }
        });
        userEvent.calendarEvents.splice(index, 1);
        return $http({
          method: 'PUT',
          url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/users?q={"username":"' + user + '"}&apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA&',
          ContentType: 'application/json',
          data: JSON.stringify({ '$set': { 'calendarEvents': userEvent.calendarEvents } })
        });
      });
    }
    return {
      getEvents: getEvents,
      getUser: getUser,
      addUserEvent: addUserEvent,
      remUserEvent: remUserEvent
    };
  }
}());

