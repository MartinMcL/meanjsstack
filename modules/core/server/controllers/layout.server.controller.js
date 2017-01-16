(function () {
  'use strict';

  angular
    .module('core')
    .controller('LayoutController', LayoutController);

  LayoutController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function LayoutController($scope, $state, Authentication, menuService) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }
}());
