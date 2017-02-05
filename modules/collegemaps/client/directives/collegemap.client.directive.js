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
        var blocks = element[0].querySelectorAll('.blocks');
        angular.forEach(blocks, function (path, key) {
          var blockElement = angular.element(path);
          blockElement.attr('block', '');
          $compile(blockElement)(scope);
        });
      }
    };
  }
  angular
    .module('collegemaps')
    .directive('block', block);

  block.$inject = ['$compile'];


  function block($compile) {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
        scope.elementId = element.attr('id');
        scope.blockClick = function () {
          alert(scope.elementId);
        };
        element.attr('ng-click', 'blockClick()');
        element.removeAttr('block');
        $compile(element)(scope);
      }
    };
  }
}());
