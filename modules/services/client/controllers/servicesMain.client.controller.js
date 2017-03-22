(function () {
  'use strict';

  angular
    .module('services')
    .controller('servicesMain', servicesMain);

  servicesMain.$inject = ['$scope', '$http', 'ServicesFactory'];

  function servicesMain($scope, $http, ServicesFactory) {


    $scope.todos = [];
    $scope.markAll = false;
    $http.get('/api/users/me')
      .then(function (result) {
        $scope.user = result.data;
        $scope.loadToDosIntoScope();
        // Do whatever you need to do with the userId here.
      });
    $scope.loadToDosIntoScope = function () {
      // Get College Events and Convert to JavaScript Date Objects
      if ($scope.user !== null) { // If a user is logged in, Retrieve their events and show
        var userResult = ServicesFactory.getUser($scope.user.username).then(function (responses) {
          $scope.userData = responses.data[0];
          $scope.todos = $scope.userData.userToDos;
        });
      }
    };

    $scope.addTodo = function () {
      if (event.keyCode === 13 && $scope.todoText && $scope.user !== null) {
        $scope.todos.push({
          text: $scope.todoText,
          done: false
        });
        var newTodo = {
          text: $scope.todoText,
          done: false
        };

        ServicesFactory.addUserTodo($scope.user.username, newTodo).then(function (response) {
          $scope.todoText = '';
          $scope.loadToDosIntoScope();
        });
      }
    };
    $scope.isTodo = function () {
      return $scope.todos.length > 0;
    };
    $scope.toggleEditMode = function () {
      $(event.target).closest('li').toggleClass('editing');
    };
    $scope.editOnEnter = function (todo) {
      if (event.keyCode === 13 && todo.text) {
        $scope.toggleEditMode();
      }
    };

    $scope.remaining = function () {
      var count = 0;
      angular.forEach($scope.todos, function (todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    $scope.hasDone = function () {
      return ($scope.todos.length !== $scope.remaining());
    };

    $scope.itemText = function () {
      return ($scope.todos.length - $scope.remaining() > 1) ? 'items' : 'item';
    };

    $scope.toggleMarkAll = function () {
      angular.forEach($scope.todos, function (todo) {
        todo.done = $scope.markAll;
      });
    };

    $scope.clear = function () {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function (todo) {
        if (todo.done && $scope.markAll === false) {
          ServicesFactory.remUserTodo($scope.user.username, todo).then(function (response) {
            $scope.loadToDosIntoScope();
          });
        } else if (todo.done && $scope.markAll === true) {
          ServicesFactory.remAllTodo($scope.user.username).then(function (response) {
            $scope.loadToDosIntoScope();
          });
        }
      });
    };
    $scope.icons = [{
      name: 'Printing',
      icon: 'glyphicon glyphicon-print printicon',
      state: 'http://pcounter.itsligo.ie/'
    },
    {

      name: 'Virtual Computer',
      icon: 'glyphicon glyphicon-cloud computericon',
      state: 'https://vdesktop.itsligo.ie/'
    },
    {
      name: 'Equipment Booking',
      icon: 'glyphicon glyphicon-book bookingicon',
      state: 'https://edtechbookings.itsligo.ie/cire/signIn.aspx'
    }
    ];
  }
}());
