(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', 'getFactory'];

  function HeaderController($scope, $state, Authentication, menuService, getFactory) {
    var vm = this;
    getFactory.getWeather().then(function (response) {
      $scope.weather = response.data.main.temp;
      // $scope.weatherstatus = response.data.weather[0].id;
      $scope.weatherstatus = response.data.weather[0].id;
    });

    $scope.logo = {
        icon: 'Student Hub',
        url: '/modules/core/client/img/brand/proj300-logo.png',
        state: '/'
      };

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    $scope.date = new Date();
    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }
}());
