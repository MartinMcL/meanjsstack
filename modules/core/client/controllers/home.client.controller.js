(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$http', 'Authentication', 'menuService', 'getFactory'];

  function HomeController($scope, $http, Authentication, menuService, getFactory) {
    var vm = this;

    getFactory.getWeather().then(function (response) {
      $scope.weather = response.data.main.temp;
      $scope.weatherstatus = response.data.weather[0].main;
    });

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    $scope.date = new Date();
    $http.get('/api/users/me')
      .then(function (result) {
        $scope.user = result.data;
        // Do whatever you need to do with the userId here.
      });

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
