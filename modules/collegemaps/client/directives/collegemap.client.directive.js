(function () {
  'use strict';

  angular
    .module('collegemaps')
    .directive('collegemap', collegemap);

  collegemap.$inject = ['$compile'];

  function collegemap($compile) {
    return {
      restrict: 'A',
      templateUrl: 'modules/collegemaps/client/img/map.svg',
      link: function(scope, element, attrs) {
        // Collegemap directive logic
        // ...
      }
    };
  }
})();
