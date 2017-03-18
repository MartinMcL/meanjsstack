(function () {
  'use strict';

  angular
    .module('timetables')
    .config(['calendarConfig', function (calendarConfig) {
      calendarConfig.showTimesOnWeekView = true;
    }])
    .controller('TimetablesController', TimetablesController);

  TimetablesController.$inject = ['$scope', '$http', 'Authentication', 'TimetablesService', 'moment'];

  function TimetablesController($scope, $http, Authentication, TimetablesService) {
    // Add information for the calendar to render
    var vm = this;
    vm.authentication = Authentication;
    $scope.calendarView = 'week';
    $scope.weekview = true;
    $scope.startOfWeek = false;
    $scope.endOfWeek = false;
    $scope.viewDate = moment();
    $scope.delActive = false;
    $scope.calendarTitle = 'Timetable';
    $scope.calEvents; // TODO: Make this function
    $http.get('/api/users/me')
      .then(function (result) {
        $scope.user = result.data;
        $scope.loadTimetableIntoScope();
        // Do whatever you need to do with the userId here.
      });
    moment().isoWeekday(1);

    $scope.loadTimetableIntoScope = function () {
      // Get College Events and Convert to JavaScript Date Objects
      if ($scope.user !== undefined) { // If a user is logged in, Retrieve their events and show
        var userResult = TimetablesService.getTimetable($scope.user).then(function (responses) {
          $scope.uCourses = responses.data[0].courses;
          $scope.uCourses.forEach(function (element) {
            if (element.courseName === $scope.user.coursename) {
              $scope.uTimetable = element.timetable;
              organiseTimetable();
            }
          }, this);
        });
      }
    };

    function organiseTimetable() {
      if ($scope.uTimetable !== undefined) {
        var count = 1;
        $scope.uTimetable.forEach(function (element) {
          if (count === 1) {
            element.monday.forEach(function (elements) {
              var timeClass = {
                title: elements.subjectName + ' - ' + elements.roomNum, // The title of the event
                startsAt: new Date(moment(moment().startOf('week')._d).year(), moment(moment().startOf('week')._d).month(), moment(moment().startOf('week')._d).date() + count, elements.startTime.split(':')[0]), // A javascript date object for when the event starts
                endsAt: new Date(moment(moment().startOf('week')._d).year(), moment(moment().startOf('week')._d).month(), moment(moment().startOf('week')._d).date() + count, elements.endTime.split(':')[0]), // A javascript date object for when the event starts
                color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                  primary: '#039fff', // the primary event color (should be darker than secondary)
                  secondary: '#cfffcf' // the secondary event color (should be lighter than primary)
                }
              };
              $scope.calEvents.push(timeClass);
            }, this);
            count++;
          } else if (count === 2) {
            element.tuesday.forEach(function (elements) {
              var timeClass = {
                title: elements.subjectName + ' - ' + elements.roomNum, // The title of the event
                startsAt: new Date(moment(moment().startOf('week')._d).year(), moment(moment().startOf('week')._d).month(), moment(moment().startOf('week')._d).date() + count, elements.startTime.split(':')[0]), // A javascript date object for when the event starts
                endsAt: new Date(moment(moment().startOf('week')._d).year(), moment(moment().startOf('week')._d).month(), moment(moment().startOf('week')._d).date() + count, elements.endTime.split(':')[0]), // A javascript date object for when the event starts
                color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                  primary: '#039fff', // the primary event color (should be darker than secondary)
                  secondary: '#cfffcf' // the secondary event color (should be lighter than primary)
                }
              };
              $scope.calEvents.push(timeClass);
            }, this);
            count++;
          } else if (count === 3) {
            element.wednesday.forEach(function (elements) {
              var timeClass = {
                title: elements.subjectName + ' - ' + elements.roomNum, // The title of the event
                startsAt: new Date(moment(moment().startOf('week')._d).year(), moment(moment().startOf('week')._d).month(), moment(moment().startOf('week')._d).date() + count, elements.startTime.split(':')[0]), // A javascript date object for when the event starts
                endsAt: new Date(moment(moment().startOf('week')._d).year(), moment(moment().startOf('week')._d).month(), moment(moment().startOf('week')._d).date() + count, elements.endTime.split(':')[0]), // A javascript date object for when the event starts
                color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                  primary: '#039fff', // the primary event color (should be darker than secondary)
                  secondary: '#cfffcf' // the secondary event color (should be lighter than primary)
                }
              };
              $scope.calEvents.push(timeClass);
            }, this);
            count++;
          } else if (count === 4) {
            element.thursday.forEach(function (elements) {
              var timeClass = {
                title: elements.subjectName + ' - ' + elements.roomNum, // The title of the event
                startsAt: new Date(moment(moment().startOf('week')._d).year(), moment(moment().startOf('week')._d).month(), moment(moment().startOf('week')._d).date() + count, elements.startTime.split(':')[0]), // A javascript date object for when the event starts
                endsAt: new Date(moment(moment().startOf('week')._d).year(), moment(moment().startOf('week')._d).month(), moment(moment().startOf('week')._d).date() + count, elements.endTime.split(':')[0]), // A javascript date object for when the event starts
                color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                  primary: '#039fff', // the primary event color (should be darker than secondary)
                  secondary: '#cfffcf' // the secondary event color (should be lighter than primary)
                }
              };
              $scope.calEvents.push(timeClass);
            }, this);
            count++;
          } else if (count === 5) {
            element.friday.forEach(function (elements) {
              var timeClass = {
                title: elements.subjectName + ' - ' + elements.roomNum, // The title of the event
                startsAt: new Date(moment(moment().startOf('week')._d).year(), moment(moment().startOf('week')._d).month(), moment(moment().startOf('week')._d).date() + count, elements.startTime.split(':')[0]), // A javascript date object for when the event starts
                endsAt: new Date(moment(moment().startOf('week')._d).year(), moment(moment().startOf('week')._d).month(), moment().startOf('week')._d.date + count, elements.endTime.split(':')[0]), // A javascript date object for when the event starts
                color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                  primary: '#039fff', // the primary event color (should be darker than secondary)
                  secondary: '#cfffcf' // the secondary event color (should be lighter than primary)
                }
              };
              $scope.calEvents.push(timeClass);
            }, this);
          }
        }, this);
      }
    }

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
      if (moment(moment($scope.viewDate)._d).format('L') !== moment(moment($scope.viewDate).startOf('week')._d).format('L')) {
        $scope.viewDate = moment($scope.viewDate).subtract(1, $scope.calendarView);
        $scope.startOfWeek = false;
        $scope.endOfWeek = false;
      } else {
        $scope.startOfWeek = true;
        $scope.endOfWeek = false;
      }
    };

    $scope.nextArrow = function () {
      if (moment(moment($scope.viewDate)._d).format('L') !== moment(moment($scope.viewDate).endOf('week')._d).format('L')) {
        $scope.viewDate = moment($scope.viewDate).add(1, $scope.calendarView);
        $scope.endOfWeek = false;
        $scope.startOfWeek = false;
      } else {
        $scope.endOfWeek = true;
        $scope.startOfWeek = false;
      }
    };
    $scope.upArrow = function () {
      if ($scope.calendarView === 'day') {
        $scope.calendarView = 'week';
        $scope.weekview = true;
      }
    };
  }
}());
