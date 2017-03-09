(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$http', 'Authentication', 'menuService', 'getFactory', 'TimetablesService'];

  function HomeController($scope, $http, Authentication, menuService, getFactory, TimetablesService) {
    var vm = this;

    getFactory.getWeather().then(function (response) {
      $scope.weather = response.data.main.temp;
<<<<<<< HEAD
      $scope.weatherstatus = response.data.weather[0].id;
      
=======
      $scope.weatherstatus = response.data.weather[0].main;
>>>>>>> 196115ddc765f1ac6d0ab7bbccec15aed265f7f0
    });

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    $scope.currentClass;
    $scope.nextClass;

    $scope.date = new Date();
    $http.get('/api/users/me')
      .then(function (result) {
        $scope.user = result.data;
        loadTimetableIntoScope();
      });
    function loadTimetableIntoScope() {
      // Get College Events and Convert to JavaScript Date Objects
      if ($scope.user !== undefined) { // If a user is logged in, Retrieve their events and show
        var userResult = TimetablesService.getTimetable($scope.user).then(function (responses) {
          $scope.uCourses = responses.data[0].courses;
          $scope.uCourses.forEach(function (element) {
            if (element.courseName === $scope.user.coursename) {
              $scope.uTimetable = element.timetable;
              getCurrentClass($scope.uTimetable);
              getNextClass($scope.uTimetable);
            }
          }, this);
        });
      }
    }
    function getCurrentClass(timetable) {
      var dow = moment().weekday();
      if (dow === 1) {
        timetable[dow - 1].monday.forEach(function (classInfo) {
          if (classInfo.startTime.split(':')[0] <= moment().hour() && classInfo.endTime.split(':')[0] > moment().hour()) {
            $scope.currentClass = classInfo.subjectName + ' - ' + classInfo.roomNum;
          }
        });
      } else if (dow === 2) {
        timetable[dow - 1].tuesday.forEach(function (classInfo) {
          if (classInfo.startTime.split(':')[0] <= moment().hour() && classInfo.endTime.split(':')[0] > moment().hour()) {
            $scope.currentClass = classInfo.subjectName + ' - ' + classInfo.roomNum;
          }
        });
      } else if (dow === 3) {
        timetable[dow - 1].wednesday.forEach(function (classInfo) {
          if (classInfo.startTime.split(':')[0] <= moment().hour() && classInfo.endTime.split(':')[0] > moment().hour()) {
            $scope.currentClass = classInfo.subjectName + ' - ' + classInfo.roomNum;
          }
        });
      } else if (dow === 4) {
        timetable[dow - 1].thursday.forEach(function (classInfo) {
          if (classInfo.startTime.split(':')[0] <= moment().hour() && classInfo.endTime.split(':')[0] > moment().hour()) {
            $scope.currentClass = classInfo.subjectName + ' - ' + classInfo.roomNum;
          }
        });
      } else if (dow === 5) {
        timetable[dow - 1].friday.forEach(function (classInfo) {
          if (classInfo.startTime.split(':')[0] <= moment().hour() && classInfo.endTime.split(':')[0] > moment().hour()) {
            $scope.currentClass = classInfo.subjectName + ' - ' + classInfo.roomNum;
          }
        });
      }
      if ($scope.currentClass === undefined) {
        $scope.currentClass = 'No classes right now!';
      }
    }
    function getNextClass(timetable) {
      var dow = moment().weekday();
      $scope.difference = 0;
      if (dow === 1) {
        timetable[dow - 1].monday.forEach(function (classInfo) {
          if (classInfo.startTime.split(':')[0] >= moment().hour() && ((classInfo.startTime.split(':')[0] - moment().hour()) < $scope.difference)) {
            $scope.nextClass = classInfo.subjectName + ' - ' + classInfo.roomNum;
            $scope.difference = (classInfo.startTime.split(':')[0] - moment().hour());
          }
        });
      } else if (dow === 2) {
        timetable[dow - 1].tuesday.forEach(function (classInfo) {
          if (classInfo.startTime.split(':')[0] >= moment().hour() && ((classInfo.startTime.split(':')[0] - moment().hour()) < $scope.difference)) {
            $scope.nextClass = classInfo.subjectName + ' - ' + classInfo.roomNum;
            $scope.difference = (classInfo.startTime.split(':')[0] - moment().hour());
          }
        });
      } else if (dow === 3) {
        timetable[dow - 1].wednesday.forEach(function (classInfo) {
          if (classInfo.startTime.split(':')[0] >= moment().hour() && ((classInfo.startTime.split(':')[0] - moment().hour()) < $scope.difference)) {
            $scope.nextClass = classInfo.subjectName + ' - ' + classInfo.roomNum;
            $scope.difference = (classInfo.startTime.split(':')[0] - moment().hour());
          }
        });
      } else if (dow === 4) {
        timetable[dow - 1].thursday.forEach(function (classInfo) {
          if (classInfo.startTime.split(':')[0] >= moment().hour() && ((classInfo.startTime.split(':')[0] - moment().hour()) < $scope.difference)) {
            $scope.nextClass = classInfo.subjectName + ' - ' + classInfo.roomNum;
            $scope.difference = (classInfo.startTime.split(':')[0] - moment().hour());
          }
        });
      } else if (dow === 5) {
        timetable[dow - 1].friday.forEach(function (classInfo) {
          if (classInfo.startTime.split(':')[0] >= moment().hour() && ((classInfo.startTime.split(':')[0] - moment().hour()) < $scope.difference)) {
            $scope.nextClass = classInfo.subjectName + ' - ' + classInfo.roomNum;
            $scope.difference = (classInfo.startTime.split(':')[0] - moment().hour());
          }
        });
      }
      if ($scope.nextClass === undefined) {
        $scope.nextClass = 'No classes for the rest of today!';
      }
    }
    $scope.icons = [{
      name: 'Timetable',
      icon: 'glyphicon glyphicon-th',
      url: '/modules/core/client/img/icons/TimeTable.svg',
      state: '/timetables'
    },
    {
      name: 'Emails',
      icon: 'glyphicon glyphicon-envelope',
      url: '/modules/core/client/img/icons/email.svg',
      state: '/emails'
    },
    {
      name: 'Calendar',
      icon: 'glyphicon glyphicon-calendar',
      url: '/modules/core/client/img/icons/calendar.svg',
      state: '/calendars'
    },
    {
      name: 'Map',
      icon: 'glyphicon glyphicon-map-marker',
      url: '/modules/core/client/img/icons/MapIcon.svg',
      state: '/collegemaps'
    },
    {
      name: 'Contacts',
      icon: 'glyphicon glyphicon-earphone',
      url: '/modules/core/client/img/icons/contact.svg',
      state: '/contacts'
    },


    {
      name: 'Services',
      icon: 'glyphicon glyphicon-th-list',
      url: '/modules/core/client/img/icons/services.svg',
      state: '/services'
    }

    ];
  }
}());
