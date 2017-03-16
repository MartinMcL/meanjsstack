(function () {
  'use strict';

  angular
    .module('studentmails')
    .controller('StudentmailsListController', StudentmailsListController);

  StudentmailsListController.$inject = ['StudentmailsService'];

  function StudentmailsListController(StudentmailsService) {
    var vm = this;

    vm.studentmails = StudentmailsService.query();
  }
}());
