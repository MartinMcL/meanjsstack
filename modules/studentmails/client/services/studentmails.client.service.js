(function () {
  'use strict';

  angular
    .module('studentmails')
    .factory('mailsFactory', mailsFactory);

  function mailsFactory($http) {
    function getMails() {
      return $http({
        method: 'GET',
        url: ''
      });
    }
    return {
      getMails: getMails
    };
  }
}());





// Studentmails service used to communicate Studentmails REST endpoints
/*(function () {
  'use strict';

  angular
    .module('studentmails')
    .factory('StudentmailsService', StudentmailsService);

  StudentmailsService.$inject = ['$resource'];

  function StudentmailsService($resource) {
    return $resource('api/studentmails/:studentmailId', {
      studentmailId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());*/
