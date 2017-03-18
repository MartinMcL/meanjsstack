(function () {
  'use strict';

  // Studentmails controller
  angular
    .module('studentmails')
    .controller('StudentmailsController', StudentmailsController);

  StudentmailsController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function StudentmailsController($scope, $state, $window, Authentication) {
    // App configuration
    var authEndpoint = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?';
    var apiEndpoint = 'https://outlook.office.com/api/v2.0';
    var redirectUri = 'http://localhost:3000/studentmails';
    var appId = '8a6e0620-094a-4268-8f3f-567d9c851c2b';
    var scopes = 'openid profile https://outlook.office.com/mail.read';
  }
}());
