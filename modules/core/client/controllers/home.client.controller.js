(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'Authentication', 'menuService', 'getFactory'];

  function HomeController($scope, Authentication, menuService, getFactory) {
    var vm = this;

    getFactory.getWeather().then(function (response) {
      $scope.weather = response.data.main.temp;
      $scope.weatherstatus = response.data.weather[0].main
    });

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    $scope.date = new Date();


    $scope.icons = [{
      icon: 'Calendar',
      url: '/modules/core/client/img/icons/calendar.svg',
      state: '/calendars'
    },
    {
      icon: 'Contact',
      url: '/modules/core/client/img/icons/contact.svg',
      state: '/contacts'
    },
    {
      icon: 'Email',
      url: '/modules/core/client/img/icons/email.svg',
      state: '/emails'
    },
    {
      icon: 'College Map',
      url: '/modules/core/client/img/icons/MapIcon.svg',
      state: '/collegemaps'
    },
    {
      icon: 'Services',
      url: '/modules/core/client/img/icons/services.svg',
      state: '/services'
    },
    {
      icon: 'Timetable',
      url: '/modules/core/client/img/icons/TimeTable.svg',
      state: '/timetables'
    }
    ];
  }
}());
