(function () {
  'use strict';

  angular
    .module('timetables')
    .controller('testController', testController)
    .factory('Timetables', Timetables);

  testController.$inject = ['$scope'];

  function testController($scope) {
  }
  function Timetables(){
        return [
      {
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
      },
    ];
  }
}());
