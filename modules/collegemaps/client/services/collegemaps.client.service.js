// Collegemaps service used to communicate Collegemaps REST endpoints
(function () {
  'use strict';

  angular
    .module('collegemaps')
    .factory('dataFactory', dataFactory);

  function dataFactory($http) {
    function getBlocks() {
      return $http({
        method: 'GET',
        url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/blocks?apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA'
      });
    }
    return {
      getBlocks: getBlocks
    };
  }
}());
