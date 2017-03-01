(function () {
  'use strict';

  angular
    .module('timetables')
    .config(['calendarConfig', function (calendarConfig) {
      calendarConfig.showTimesOnWeekView = true;
    }])
    .controller('TimetablesController', TimetablesController);

  TimetablesController.$inject = ['$scope', 'CalendarFactory', 'moment'];

  function TimetablesController($scope) {
    // Add information for the calendar to render
    $scope.calendarView = 'week';
    $scope.weekview = true;
    $scope.viewDate = moment();
    $scope.delActive = false;
    $scope.calendarTitle = 'Timetable';

    $scope.calEvents = [
      {
        title: 'Maths', // The title of the event
        startsAt: new Date(2017, 2, 1, 9), // A javascript date object for when the event starts
        endsAt: new Date(2017, 2, 1, 11), // Optional - a javascript date object for when the event ends
        color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
          primary: '#e3bc08' // the primary event color (should be darker than secondary)
        }
      }, {
        title: 'Web Programming', // The title of the event
        startsAt: new Date(2017, 2, 1, 12), // A javascript date object for when the event starts
        endsAt: new Date(2017, 2, 1, 14), // Optional - a javascript date object for when the event ends
        color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
          primary: '#e3bc08' // the primary event color (should be darker than secondary)
        }
      }, {
        title: 'Database', // The title of the event
        startsAt: new Date(2017, 2, 1, 14), // A javascript date object for when the event starts
        endsAt: new Date(2017, 2, 1, 16), // Optional - a javascript date object for when the event ends
        color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
          primary: '#e3bc08' // the primary event color (should be darker than secondary)
        }
      }, 
    ];
    console.log($scope.events);
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

    $scope.events = [
      {
        title: 'Maths',
        startsAt: new Date(2017, 3, 1, 9),
        endsAt: new Date(2017, 3, 1, 11),
        color: 'red'
      },
      {
        title: 'Database',
        startsAt: new Date(2017, 3, 1, 12),
        endsAt: new Date(2017, 3, 1, 13),
        color: 'red'
      }
    ];
  }
}());
