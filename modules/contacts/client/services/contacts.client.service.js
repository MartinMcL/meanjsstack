(function () {
  'use strict';

  angular
    .module('contacts')
    .factory('contactsFactory', contactsFactory);

  function contactsFactory($http) {
    function getContacts() {
      return $http({
        method: 'GET',
        url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/contacts?apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA'
      });
    }
    function getUser(user) {
      return $http({
        method: 'GET',
        url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/users?q={"username":"' + user + '"}&apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA&'
      });
    }
    function addUserContact(user, contact) {
      var newData = getUser(user).then(function (response) {
        var userObj = response.data[0];
        userObj.userContacts.push(contact); // Add new event to the list in user object
        return $http({
          method: 'PUT',
          url: 'https://api.mlab.com/api/1/databases/bamsdevdb/collections/users?q={"username":"' + user + '"}&apiKey=kDXKvwOsOc2CEpsqYadOjacn36flg_yA&',
          ContentType: 'application/json',
          data: JSON.stringify({ '$set': { 'userContacts': userObj.userContacts } }) // Send new calendarEvents to DB
        });
      });
      return newData;
    }
    return {
      getContacts: getContacts,
      getUser: getUser,
      addUserContact: addUserContact
    };
  }
}());
