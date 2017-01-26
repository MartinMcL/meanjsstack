(function () {
  'use strict';

  angular
    .module('calendars')
    .controller('CalendarsMainCtrl', CalendarsMainCtrl);

  CalendarsMainCtrl.$inject = ['$scope', 'moment'];

  function CalendarsMainCtrl($scope) {
    // Add information for the calendar to render
    $scope.calendarView = 'month';
    $scope.viewDate = moment();
    $scope.events = [];
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

    $scope.addEvent = function () {
      var newEvent = {
        title: $scope.addEventForm.calTitle,
        startsAt: new Date($scope.addEventForm.startsAtY, $scope.addEventForm.startsAtM - 1, $scope.addEventForm.startsAtD),
        endsAt: new Date($scope.addEventForm.endsAtY, $scope.addEventForm.endsAtM - 1, $scope.addEventForm.endsAtD),
        color: {
          primary: $scope.addEventForm.colour,
          secondary: '#fdf1ba'
        }
      };
      $scope.events.push(newEvent);
      $scope.addEventForm = '';
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
