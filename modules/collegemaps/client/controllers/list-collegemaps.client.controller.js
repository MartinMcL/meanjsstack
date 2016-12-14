(function () {
  'use strict';

  angular
    .module('collegemaps')
    .controller('CollegemapsListController', CollegemapsListController);

  CollegemapsListController.$inject = ['CollegemapsService'];

  function CollegemapsListController(CollegemapsService) {
    var vm = this;

    vm.collegemaps = CollegemapsService.query();
  }
}());
