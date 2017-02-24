(function () {
  'use strict';

  angular
    .module('users')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function SettingsController($scope, $state, Authentication, menuService) {
        var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;

  }
}());
