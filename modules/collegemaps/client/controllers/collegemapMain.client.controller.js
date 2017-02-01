(function () {
  'use strict';

  angular
    .module('collegemaps')
    .controller('CollegeMapMainCtrl', CollegeMapMainCtrl);

  CollegeMapMainCtrl.$inject = ['$scope', "$http"];

  function CollegeMapMainCtrl($scope, $http) {
    $scope.makeCall = function () {
      $http({
        method: 'GET',
        url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/blocks?apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA'
      }).then(function successCallback(response) {
        console.log(response.data)
      }, function errorCallback(response) {
        console.log("woops")
      });
    }




  }
} ());
