(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope'];

  function HomeController($scope) {
    var vm = this;

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
