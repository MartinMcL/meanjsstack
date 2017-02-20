(function () {
  'use strict';

  // angular
  //   .module('collegemaps')
  //   .directive('collegemap', collegemap);

  // collegemap.$inject = ['$compile'];


  // function collegemap($compile) {
  //   return {
  //     restrict: 'A',
  //     scope: true,
  //     templateUrl: 'modules/collegemaps/client/img/map.svg',
  //     link: function (scope, element, attrs) {
           
            
  //         element.on('click', function() {
  //           console.log("Top " + element.parent()[0].scrollTop,"Left " + element.parent()[0].scrollLeft)
  //         }); 
  //       var blocks = element[0].querySelectorAll('.blocks');
  //       angular.forEach(blocks, function (path, key) {
  //         var blockElement = angular.element(path);
  //         blockElement.attr('block', '');
  //         $compile(blockElement)(scope);

  //       });
  //     }
  //   };
  // }
  // angular
  //   .module('collegemaps')
  //   .directive('block', block);

  // block.$inject = ['$compile'];


  // function block($compile) {
  //   return {
  //     restrict: 'A',
  //     scope: true,
  //     link: function (scope, element, attrs) {
  //       scope.elementId = element.attr('id');
  //       scope.blockClick = function () {
  //         console.log(scope.elementId);
  //       };
  //       element.attr('ng-click', 'blockClick()');
  //       element.removeAttr('block');
  //       $compile(element)(scope);

  //       attrs.$observe('viewBox', function(value) {
  //         element.attr('viewBox', "607 641 800 600");
  //       });
  //     }
  //   };
  // }

  angular
  .module('collegemaps')
  .directive('look', look);
  look.$inject = ['$compile'];
  function look($compile){
    return{
      restrict: 'A',
      scope: true,
      templateUrl: 'modules/collegemaps/client/views/blocksTable.client.view.html',
      link: function (scope,element,attrs) {
        var map = angular.element(document.getElementById(attrs.handleId));
        scope.gotoBlock = function(x){
          map[0].scrollTop = x.mapPosition.top;
          map[0].scrollLeft = x.mapPosition.left;
        };
      }
    };
  }
}());
