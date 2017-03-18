// Services service used to communicate Services REST endpoints
(function () {
  'use strict';

  angular
    .module('services')
    .factory('ServicesFactory', ServicesFactory);

  function ServicesFactory($http) {
    function addUserTodo(user, todo) {
      var newData = getUser(user).then(function (response) {
        var userObj = response.data[0];
        userObj.userToDos.push(todo); // Add new event to the list in user object
        return $http({
          method: 'PUT',
          url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/users?q={"username":"' + user + '"}&apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA&',
          ContentType: 'application/json',
          data: JSON.stringify({ '$set': { 'userToDos': userObj.userToDos } }) // Send new calendarEvents to DB
        });
      });
      return newData;
    }
    function getUser(user) {
      return $http({
        method: 'GET',
        url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/users?q={"username":"' + user + '"}&apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA&'
      });
    }
    function remUserTodo(user, todo) {
      var newData = getUser(user).then(function (response) {
        var userObject = response.data[0];
        var index = -1; // Default value
        userObject.userToDos.forEach(function (element) {
          if (todo.text === element.text) {
            index = userObject.userToDos.indexOf(element);
          }
        });
        if (index !== -1) {
          userObject.userToDos.splice(index, 1); // Remove 1 event at the index of the matched event
        }
        return $http({
          method: 'PUT',
          url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/users?q={"username":"' + user + '"}&apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA&',
          ContentType: 'application/json',
          data: JSON.stringify({ '$set': { 'userToDos': userObject.userToDos } }) // Replace calendarEvents with new one less an event
        });
      });
      return newData;
    }
    function remAllTodo(user) {
      var newData = getUser(user).then(function (response) {
        var userObject = response.data[0];
        return $http({
          method: 'PUT',
          url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/users?q={"username":"' + user + '"}&apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA&',
          ContentType: 'application/json',
          data: JSON.stringify({ '$set': { 'userToDos': [] } }) // Replace calendarEvents with new one less an event
        });
      });
      return newData;
    }
    return {
      getUser: getUser,
      addUserTodo: addUserTodo,
      remUserTodo: remUserTodo,
      remAllTodo: remAllTodo
    };
  }
}());
