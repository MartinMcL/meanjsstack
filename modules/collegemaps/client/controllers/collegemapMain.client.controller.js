(function () {
  'use strict';

  angular
    .module('collegemaps')
    .controller('CollegeMapMainCtrl', CollegeMapMainCtrl);

  CollegeMapMainCtrl.$inject = ['$scope', 'dataFactory'];

  function CollegeMapMainCtrl($scope, dataFactory) {

    dataFactory.getBlocks().then(function (response) {
      $scope.blocks = response.data[0].blocks
    });

    $scope.gotoBlock = function (blockid) {
      console.log(blockid);
    };
  
  }
} ());
