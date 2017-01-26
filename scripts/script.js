angular.module('resource.timetables', []);

angular.module('resource.timetables')
  .factory('Timetables', function () {
      return [
        {
            TTDId: 1,
            TTDName: 'Semester 1',
            TTDMonday: '111101111011111110111111',
            TTDTuesday: '111101111011111110111111',
            TTDWednesday: '111101111011111110111111',
            TTDThursday: '111101111011111110111111',
            TTDFriday: '111101111011111110111111',

        }, {
            TTDId: 2,
            TTDName: 'Semester 2',
            TTDMonday: '111100000011111110111111',
            TTDTuesday: '111100000011111110111111',
            TTDWednesday: '111100000011111110111111',
            TTDThursday: '111100000011111110111111',
            TTDFriday: '111100000011111110111111',

        },

      ];


  });

angular.module('myApp', ['resource.timetables']);

angular.module('myApp')
  .controller('MainCtrl', ['$scope', 'Timetables', function ($scope, Timetables) {
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
  }]);

angular.module('myApp')
    .directive('myTimetable', function () {
        return {
            restrict: 'A',
            templateUrl: 'my-timetable.tpl.html',
            scope: {
                slots: '='
            },
            link: function (scope, element, attributes) {
                console.log('in directive');
                var _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

                var _selection = {
                    state: false,
                    day: [0, 0, 0, 0, 0],
                    hour: [0, 0, 0, 0, 0, 0, 0, 0, 0,]
                };
                var _slots = [
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                ];

                function _loop(begin, end, step) {
                    var array = [];

                    for (var i = begin; i <= end; i += step) {
                        array.push(i);
                    }

                    return array;
                }

                function _toggle(what, day, hour) {
                    var i = 0;

                    switch (what) {
                        case 'day':
                            _selection.day[day] = !_selection.day[day];

                            for (i = 0; i < 24; i++) {
                                scope.slots[day][i] = _selection.day[day];
                            }
                            break;

                        case 'hour':
                            _selection.hour[hour] = !_selection.hour[hour];

                            for (i = 0; i < 7; i++) {
                                scope.slots[i][hour] = _selection.hour[hour];
                            }
                            break;

                        case 'slot':
                            if (_selection.state) {
                                scope.slots[day][hour] = !scope.slots[day][hour];
                            }
                            break;
                    }
                }

                function _populate(populate) {
                    $scope.populate = _populate;
                }

                function _select(state, day, hour) {
                    _selection.state = state;

                    if (_selection.state) {
                        _toggle('slot', day, hour);
                    }
                }

                function _init() {
                    scope.loop = _loop;
                    scope.toggle = _toggle;
                    scope.select = _select;

                    scope.days = _days;
                    scope.slots = _slots;
                }

                _init();
            }

        };

    });
