(function () {
  'use strict';

  angular
    .module('timetables')
    .controller('testController', testController)
    .factory('Timetables', Timetables);

  testController.$inject = ['$scope'];

  function testController($scope) {
    var _timetables = Timetables;
    console.log(_timetables);

    function _init() {
      console.log('in controller');
      $scope.slots = [];
      $scope.timetables = _timetables;
      $scope.timetable = {};

      $scope.$watchCollection('timetable', function () {
        console.log('selected timetable changed');
      }, true);
    }

    _init();

  }

  function Timetables() {
    return [{
      TTDId: 1,
      TTDName: 'Small coffee breaks',
      TTDMonday: '111101111011111110111111',
      TTDTuesday: '111101111011111110111111',
      TTDWednesday: '111101111011111110111111',
      TTDThursday: '111101111011111110111111',
      TTDFriday: '111101111011111110111111',
      TTDSaturday: '111101111011111110111111',
      TTDSunday: '111101111011111110111111'
    }, {
      TTDId: 2,
      TTDName: 'Larger coffee breaks',
      TTDMonday: '111100000011111110111111',
      TTDTuesday: '111100000011111110111111',
      TTDWednesday: '111100000011111110111111',
      TTDThursday: '111100000011111110111111',
      TTDFriday: '111100000011111110111111',
      TTDSaturday: '111100000011111110111111',
      TTDSunday: '111100000011111110111111'
    }];
  }
}());
