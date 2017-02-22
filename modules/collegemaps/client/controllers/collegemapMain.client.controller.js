(function () {
  'use strict';

  angular
    .module('collegemaps')
    .controller('CollegeMapMainCtrl', CollegeMapMainCtrl);

  CollegeMapMainCtrl.$inject = ['$scope', 'dataFactory', 'NgMap'];

  function CollegeMapMainCtrl($scope, dataFactory, NgMap) {

    dataFactory.getBlocks().then(function (response) {
      $scope.blocks = response.data[0].blocks;

    });

    $scope.gotoBlock = function (blockid) {
      console.log(blockid);
    };

    $scope.flyTo =function() {
      
    };


    $scope.config = {}; // use defaults
    $scope.model = {}; // always pass empty object


    $scope.getCords = function ($event) {
      $event.target()[0].scrollTop = 500;
      // console.log($event.offsetX, $event.offsetY);
    };

  }
}());
