
(function() {
  'use strict';

  angular
    .module('core')
    .directive('login', login);

  login.$inject = ['$compile'];


  function login($compile) {
    return {
      restrict: 'A',
      scope: true,
      templateUrl: 'modules/users/client/views/authentication/sidebarsignin.client.view.html',
      link: function (scope, element, attrs) {

      }
    };
  }
}());
