(function () {
  'use strict';

  angular
    .module('contacts')
    .controller('ContactsMainCtrl', ContactsMainCtrl);

  ContactsMainCtrl.$inject = ['$scope', 'contactsFactory'];

  function ContactsMainCtrl($scope, $http, contactsFactory) {

    contactsFactory.getContacts().then(function (response) {
      $scope.contacts = response.data;
      console.log(response.data)
      $http.get('/api/users/me')
      .then(function (result) {
        $scope.user = result.data;
        $scope.loadEventsIntoScope();
        // Do whatever you need to do with the userId here.
      });
      
      $scope.loadEventsIntoScope = function () {
      // Get College Contacts and Convert to JavaScript Date Objects
      var result = contactsFactory.getContacts().then(function (response) {
        $scope.contacts = response.data[0].contacts;
        
        $scope.contacts.forEach(function (element) {
          //what?
          element.startsAt = new Date(element.startsAt);
          element.endsAt = new Date(element.endsAt);
        }, this);
        if ($scope.user !== null) { // If a user is logged in, Retrieve their events and show
          var userResult = contactsFactory.getUser($scope.user.username).then(function (responses) {
            $scope.userData = responses.data[0];
            //contactsDetails - name in mongo user database???
            $scope.uContacts = $scope.userData.contactsDetails;
            $scope.uContacts.forEach(function (element) {
              //change elements to contacts details???
              element.startsAt = new Date(element.startsAt);
              if (element.endsAt !== '') {
                element.endsAt = new Date(element.endsAt);
              }
              $scope.contacts.push(element);
            }, this);
          });
        }
      });
    };


    $scope.addContactForm = {
      'name': '',
      'email': '',
      'number': ''
    };


$scope.addContact = function () {
      if ($scope.user !== null) {

        var newContact = { // New contact object to insert
          name: $scope.addContactForm.name,
          email: $scope.addContactForm.email,
          phoneNumber: $scope.addContactForm.number
        };
        //add contacts section to user???
        if (newContact.name !== '' && $scope.addContactForm.email !== '' && $scope.addContactForm.number !== '' ) {
          var result = contactsFactory.addUserEvent($scope.user.username, newContact).then(function (response) {
            $scope.clearForm();
            $scope.loadEventsIntoScope(); // Refresh contact's view of the scope.
          });
        } else {
          alert('Must insert contact details!'); // TODO: Remove alert?
        }
        // Run function to add to the user's document
      } else {
        window.location.reload();
      }
    };


     $scope.config = {}; // use defaults
    $scope.model = {}; // always pass empty object


  })
  }
}());