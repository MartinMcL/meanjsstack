(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope'];

  function HomeController($scope) {
    var vm = this;
    
    $scope.icons = [
      {
        icon: 'Calendar',
        url: '/modules/core/client/img/icons/calendar.svg'
      },
      {
        icon: 'Contact',
        url: '/modules/core/client/img/icons/contact.svg'
      },
      {
        icon: 'Email',
        url: '/modules/core/client/img/icons/email.svg'
      },
      {
        icon: 'College Map',
        url: '/modules/core/client/img/icons/MapIcon.svg'
      },
      {
        icon: 'Services',
        url: '/modules/core/client/img/icons/services.svg'
      },
      {
        icon: 'Timetable',
        url: '/modules/core/client/img/icons/TimeTable.svg'
      }
    ]
  }
}());
