(function () {
  'use strict';
  angular
    .module('core')
    .factory('getFactory', getFactory);
  /** @ngInject */
  function getFactory($http) {
    function getWeather() {
      return $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather?lat=54.27&lon=-8.47&APPID=f7f343f62150b7f00cbd08e075820d2f&units=metric'
      });
    }
    function getTwitter() {

    }
    return {
      getWeather: getWeather
    };
  }
}());
