(function () {
  'use strict';

  // Timetables controller
  angular
    .module('timetables')
    .controller('TimetablesController', TimetablesController);

  TimetablesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'timetableResolve'];

  function TimetablesController ($scope, $state, $window, Authentication, timetable) {
    var vm = this;

    vm.authentication = Authentication;
    vm.timetable = timetable;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Timetable
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.timetable.$remove($state.go('timetables.list'));
      }
    }

    // Save Timetable
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.timetableForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.timetable._id) {
        vm.timetable.$update(successCallback, errorCallback);
      } else {
        vm.timetable.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('timetables.view', {
          timetableId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
