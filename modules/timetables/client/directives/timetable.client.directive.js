(function () {
  'use strict';

  angular
    .module('timetables')
    .directive('myTimetable', myTimetable);


  /** @ngInject */
  function myTimetable($compile) {
    return {
      restrict: 'A',
      templateUrl: 'modules/timetables/client/views/my-timetable.tpl.html',
      scope: true,
      link: function (scope, element, attributes) {
        console.log('in directive');
        var _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        var _selection = {
          state: false,
          day: [0, 0, 0, 0, 0],
          hour: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
        var _slots = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

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
<<<<<<< HEAD
    };
=======
    }
>>>>>>> 0f655be6bc2e762003771e1de67fcb95334d03b4
  }
}());
