(function () {
  'use strict';

  angular
    .module('contacts')
    .directive('contact', contact);

  contact.$inject = ['$compile'];


  function contact($compile) {
    return {
      restrict: 'A',
      scope: true,
      templateUrl: 'modules/contacts/client/views/contact.client.view.html',
    };
  }
  
}());
