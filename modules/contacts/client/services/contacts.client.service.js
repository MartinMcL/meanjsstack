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
    return {
      getContacts: getContacts
    };
  }
}());




// /*// Contacts service used to communicate Contacts REST endpoints
// (function () {
//   'use strict';

//   angular
//     .module('contacts')
//     .factory('ContactsService', ContactsService);

//   ContactsService.$inject = ['$resource'];

//   function ContactsService($resource) {
//     return $resource('api/contacts/:contactId', {
//       contactId: '@_id'
//     }, {
//       update: {
//         method: 'PUT'
//       }
//     });
//   }
// }());
// */