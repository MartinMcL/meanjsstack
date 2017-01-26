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
  }
}());
