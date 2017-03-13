(function() {
  'use strict';
  angular
        .module('users')
        .controller('OverviewController', OverviewController);
    /** @ngInject */
  OverviewController.$inject = ['$scope', '$state', '$http', 'Authentication', 'menuService'];
  function OverviewController($scope, $state, $http, Authentication, menuService) {
    var vm = this;
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    $http.get('/api/users/me')
      .then(function (result) {
        vm.user = result.data;
        // Do whatever you need to do with the userId here.
      });
  }
}());
