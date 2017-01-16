(function () {
  'use strict';

  angular
    .module('collegemaps')
    .directive('collegemap', collegemap);

  collegemap.$inject = ['$compile'];


  function collegemap($compile) {
    return {
      restrict: 'A',
      scope: true,
      templateUrl: 'modules/collegemaps/client/img/map.svg',
      link: function (scope, element, attrs) {
        scope.elementId = element.attr("id");
        scope.blockClick = function () {
          alert(scope.elementId)
        };
      }
    }
  };


})();
