(function(){
    'use strict';

    angular
        .module('users')
        .controller('OverviewController', OverviewController)

    /** @ngInject */
  OverviewController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function OverviewController($scope, $state, Authentication, menuService) {
        var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;

  }
}());