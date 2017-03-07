(function () {
  'use strict';

  angular
    .module('timetables')
    .config(['calendarConfig', function (calendarConfig) {
      calendarConfig.showTimesOnWeekView = true;
    }])
    .controller('TimetablesController', TimetablesController);

  TimetablesController.$inject = ['$scope', '$http', 'Authentication', 'CalendarFactory', 'moment'];

  function TimetablesController($scope, $http, Authentication) {
    // Add information for the calendar to render
    var vm = this;
    vm.authentication = Authentication;
    $scope.calendarView = 'week';
    $scope.weekview = true;
    $scope.viewDate = moment();
    $scope.delActive = false;
    $scope.calendarTitle = 'Timetable';
    $scope.calEvents; // TODO: Make this function
    $http.get('/api/users/me')
      .then(function (result) {
        $scope.user = result.data;
        // Do whatever you need to do with the userId here.
      });
    moment.locale('en_gb', {
      week: {
        dow: 1 // Monday is the first day of the week
      }
    });
    $scope.tsClicked = function (calendarDate) { // Populate form with timespan that was clicked in month view
      if ($scope.calendarView === 'day') {
        $scope.weekview = false;
      }
    };
    $scope.eventClicked = function (calendarDate) { // Populate form with timespan that was clicked in month view
      if ($scope.calendarView === 'day') {
        $scope.weekview = false;
      }
    };
    $scope.viewClicked = function (calendarDate) { // Populate form with timespan that was clicked in month view
      if ($scope.calendarView === 'week') {
        $scope.weekview = false;
      }
    };
    $scope.prevArrow = function () {
      $scope.viewDate = moment($scope.viewDate).subtract(1, $scope.calendarView);
    };

    $scope.nextArrow = function () {
      $scope.viewDate = moment($scope.viewDate).add(1, $scope.calendarView);
    };
    $scope.upArrow = function () {
      if ($scope.calendarView === 'day') {
        $scope.calendarView = 'week';
        $scope.weekview = true;
      }
    };
  }
}());
