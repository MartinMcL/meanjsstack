(function () {
  'use strict';

  angular
    .module('collegemaps')
    .controller('CollegeMapMainCtrl', CollegeMapMainCtrl);

  CollegeMapMainCtrl.$inject = ['$scope'];

  function CollegeMapMainCtrl($scope) {
    // Correct the block names
    var blocks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    $scope.data = function() {
      var dataTemp = {};
      angular.forEach(blocks, function(block, key) {
        dataTemp[block] = { value: Math.random() };
      });
      $scope.mainData = dataTemp;
    };
    $scope.data();

  }
}());
