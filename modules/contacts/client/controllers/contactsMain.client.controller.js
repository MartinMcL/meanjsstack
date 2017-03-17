(function () {
  'use strict';

  angular
    .module('contacts')
    .controller('ContactsMainCtrl', ContactsMainCtrl);

  ContactsMainCtrl.$inject = ['$scope', '$http', 'contactsFactory'];

  function ContactsMainCtrl($scope, $http, contactsFactory) {
    $scope.loadContactsIntoScope = function () {
      contactsFactory.getContacts().then(function (response) {
        $scope.contacts = response.data;
        $http.get('/api/users/me')
          .then(function (result) {
            $scope.user = result.data;
            if ($scope.user !== undefined && $scope.user !== null) {
              contactsFactory.getUser($scope.user.username).then(function (response) {
                if (response.data.length > 0) {
                  $scope.userContacts = response.data[0].userContacts;
                }
              });
            }
            // Do whatever you need to do with the userId here.
          });
      });
    };

    $scope.addContactForm = {
      'name': '',
      'email': '',
      'number': ''
    };

    $scope.clearForm = function () {
      $scope.addContactForm.name = '';
      $scope.addContactForm.email = '';
      $scope.addContactForm.number = '';
    };

    $scope.addContact = function () {
      if ($scope.user !== null) {
        var newContact = { // New contact object to insert
          name: $scope.addContactForm.name,
          email: $scope.addContactForm.email,
          phoneNumber: $scope.addContactForm.number
        };
        if (newContact.name !== '' && $scope.addContactForm.email !== '' && $scope.addContactForm.number !== '') {
          var result = contactsFactory.addUserContact($scope.user.username, newContact).then(function (response) {
            $scope.clearForm();
            $scope.loadContactsIntoScope();
          });
        } else {
          alert('Must insert contact details!'); // TODO: Remove alert?
        }
      }
    };
  }
}());
