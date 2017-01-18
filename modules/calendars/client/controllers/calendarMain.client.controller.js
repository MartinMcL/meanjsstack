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
  }
}());
