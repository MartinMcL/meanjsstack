(function () {
  'use strict';

  angular
    .module('timetables')
    .controller('TimetablesListController', TimetablesListController);

  TimetablesListController.$inject = ['TimetablesService'];

  function TimetablesListController(TimetablesService) {
    var vm = this;

    vm.timetables = TimetablesService.query();
  }
}());
