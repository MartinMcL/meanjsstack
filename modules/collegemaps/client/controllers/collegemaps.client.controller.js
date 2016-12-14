(function () {
  'use strict';

  // Collegemaps controller
  angular
    .module('collegemaps')
    .controller('CollegemapsController', CollegemapsController);

  CollegemapsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'collegemapResolve'];

  function CollegemapsController ($scope, $state, $window, Authentication, collegemap) {
    var vm = this;

    vm.authentication = Authentication;
    vm.collegemap = collegemap;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Collegemap
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.collegemap.$remove($state.go('collegemaps.list'));
      }
    }

    // Save Collegemap
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.collegemapForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.collegemap._id) {
        vm.collegemap.$update(successCallback, errorCallback);
      } else {
        vm.collegemap.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('collegemaps.view', {
          collegemapId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
