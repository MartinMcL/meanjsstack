(function () {
  'use strict';

  angular
    .module('calendars')
    .controller('CalendarsMainCtrl', CalendarsMainCtrl);

  CalendarsMainCtrl.$inject = ['$scope', 'CalendarFactory', 'moment'];

  function CalendarsMainCtrl($scope, CalendarFactory) {
    // Add information for the calendar to render
    $scope.calendarView = 'month';
    $scope.viewDate = moment();
    $scope.delActive = false;
    $scope.loadEventsIntoScope = function () {
      var result = CalendarFactory.getEvents().then(function (response) {
        $scope.events = response.data[0].events;
        $scope.events.forEach(function (element) {
          element.startsAt = new Date(element.startsAt);
          element.endsAt = new Date(element.endsAt);
        }, this);
        if (user.username != null) {
          var userResult = CalendarFactory.getUser(user.username).then(function (responses) {
            $scope.user = responses.data[0];
            $scope.uEvents = $scope.user.calendarEvents;
            $scope.uEvents.forEach(function (element) {
              element.startsAt = new Date(element.startsAt);
              if (element.endsAt !== '') {
                element.endsAt = new Date(element.endsAt);
              }
              $scope.events.push(element);
            }, this);
          });
        }
      });
    };
    $scope.calendarTitle = 'Student Calendar';
    $scope.addEventForm = {
      'calTitle': '',
      'startsAtD': '',
      'startsAtM': '',
      'startsAtY': '',
      'endsAtD': '',
      'endsAtM': '',
      'endsAtY': '',
      'colour': ''
    };
    $scope.clearForm = function () {
      $scope.addEventForm.calTitle = '';
      $scope.addEventForm.startsAtD = '';
      $scope.addEventForm.startsAtM = '';
      $scope.addEventForm.startsAtY = '';
      $scope.addEventForm.endsAtD = '';
      $scope.addEventForm.endsAtM = '';
      $scope.addEventForm.endsAtY = '';
      $scope.addEventForm.colour = '';
    };
    $scope.eventClicked = function (calendarEvent) {
      $scope.addEventForm.calTitle = calendarEvent.title.toString();
      $scope.addEventForm.startsAtD = calendarEvent.startsAt.getDate();
      $scope.addEventForm.startsAtM = calendarEvent.startsAt.getMonth();
      $scope.addEventForm.startsAtY = calendarEvent.startsAt.getFullYear();
      if (calendarEvent.endsAt != null) {
        $scope.addEventForm.endsAtD = calendarEvent.endsAt.getDate();
        $scope.addEventForm.endsAtM = calendarEvent.endsAt.getMonth();
        $scope.addEventForm.endsAtY = calendarEvent.endsAt.getFullYear();
      }
      $scope.addEventForm.colour = calendarEvent.color.primary;
      if (calendarEvent.cssClass === 'college-events') {
        $scope.delActive = false;
      }
      else {
        $scope.delActive = true;
      }
    };
    $scope.tsClicked = function (calendarDate) {
      $scope.addEventForm.calTitle = null;
      $scope.addEventForm.startsAtD = calendarDate.getDate();
      $scope.addEventForm.startsAtM = calendarDate.getMonth() + 1;
      $scope.addEventForm.startsAtY = calendarDate.getFullYear();
      $scope.addEventForm.endsAtD = '';
      $scope.addEventForm.endsAtM = '';
      $scope.addEventForm.endsAtY = '';
      $scope.addEventForm.colour = '';
    };

    $scope.addEvent = function () {
      var endevent = new Date($scope.addEventForm.startsAtY, $scope.addEventForm.startsAtM - 1, $scope.addEventForm.startsAtD);
      if (($scope.addEventForm.endsAtY + $scope.addEventForm.endsAtM + $scope.addEventForm.endsAtD).length > 0) {
        endevent = new Date($scope.addEventForm.endsAtY, $scope.addEventForm.endsAtM - 1, $scope.addEventForm.endsAtD);
      }
      var newEvent = {
        title: $scope.addEventForm.calTitle,
        startsAt: new Date($scope.addEventForm.startsAtY, $scope.addEventForm.startsAtM - 1, $scope.addEventForm.startsAtD),
        endsAt: endevent,
        color: {
          primary: $scope.addEventForm.colour,
          secondary: '#fdf1ba'
        }
      };
      var result = CalendarFactory.addUserEvent(user.username, newEvent);
      $scope.clearForm();
      $scope.loadEventsIntoScope();
      console.log(result);
    };
    $scope.remEvent = function () {
      var endevent = new Date($scope.addEventForm.startsAtY, $scope.addEventForm.startsAtM - 1, $scope.addEventForm.startsAtD);
      if (($scope.addEventForm.endsAtY + $scope.addEventForm.endsAtM + $scope.addEventForm.endsAtD).length > 0) {
        endevent = new Date($scope.addEventForm.endsAtY, $scope.addEventForm.endsAtM - 1, $scope.addEventForm.endsAtD);
      }
      var newEvent = {
        title: $scope.addEventForm.calTitle,
        startsAt: new Date($scope.addEventForm.startsAtY, $scope.addEventForm.startsAtM - 1, $scope.addEventForm.startsAtD),
        endsAt: endevent,
        color: {
          primary: $scope.addEventForm.colour,
          secondary: '#fdf1ba'
        }
      };
      var results = CalendarFactory.remUserEvent(user.username, newEvent);
      $scope.clearForm();
      $scope.loadEventsIntoScope();
      console.log(results);
      // window.location.reload(); // I think problem is with asynchronous code here
    };

    $scope.prevArrow = function () {
      if ($scope.calendarView === 'day') {
        $scope.viewDate = moment($scope.viewDate).subtract(1, 'day');
      } else if ($scope.calendarView === 'month') {
        $scope.viewDate = moment($scope.viewDate).subtract(1, 'month');
      } else {
        $scope.viewDate = moment($scope.viewDate).subtract(1, 'year');
      }
    };

    $scope.nextArrow = function () {
      if ($scope.calendarView === 'day') {
        $scope.viewDate = moment($scope.viewDate).add(1, 'day');
      } else if ($scope.calendarView === 'month') {
        $scope.viewDate = moment($scope.viewDate).add(1, 'month');
      } else {
        $scope.viewDate = moment($scope.viewDate).add(1, 'year');
      }
    };
    $scope.upArrow = function () {
      if ($scope.calendarView === 'day') {
        $scope.calendarView = 'month';
      } else if ($scope.calendarView === 'month') {
        $scope.calendarView = 'year';
      }
    };
  }
}());
