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

        var blocks = element[0].querySelectorAll('.blocks');

        angular.forEach(blocks, function (block, key) {

          var blockElement = angular.element(block);

          blockElement.attr("block", "");
          $compile(blockElement)(scope);
        })
      }
    };
  };
  angular
    .module('collegemaps')
    .directive('getSol', getSol);
  getSol.$inject = ["$compile"];
  function getSol($compile){

    return {
      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
        scope.elementId = element.attr("id");
        scope.blockClick = function () {
            alert(scope.elementId);
        };
    }
  }
  };

})();
