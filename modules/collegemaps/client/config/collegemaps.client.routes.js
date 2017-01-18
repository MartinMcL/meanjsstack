(function () {
  'use strict';

  angular
    .module('collegemaps')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('collegemaps', {
        abstract: true,
        url: '/collegemaps',
        templateUrl: 'modules/collegemaps/client/views/collegemap.client.view.html',
        controller: 'CollegeMapMainCtrl',
        directive: 'collegemap',
        data: {
          pageTitle: 'College Map'
        }
      })
      .state('collegemaps.list', {
        url: '',
        templateUrl: 'modules/collegemaps/client/views/list-collegemaps.client.view.html',
        controller: 'CollegemapsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Collegemaps List'
        }
      })
      .state('collegemaps.create', {
        url: '/create',
        templateUrl: 'modules/collegemaps/client/views/form-collegemap.client.view.html',
        controller: 'CollegemapsController',
        controllerAs: 'vm',
        resolve: {
          collegemapResolve: newCollegemap
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Collegemaps Create'
        }
      })
      .state('collegemaps.edit', {
        url: '/:collegemapId/edit',
        templateUrl: 'modules/collegemaps/client/views/form-collegemap.client.view.html',
        controller: 'CollegemapsController',
        controllerAs: 'vm',
        resolve: {
          collegemapResolve: getCollegemap
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Collegemap {{ collegemapResolve.name }}'
        }
      })
      .state('collegemaps.view', {
        url: '/:collegemapId',
        templateUrl: 'modules/collegemaps/client/views/view-collegemap.client.view.html',
        controller: 'CollegemapsController',
        controllerAs: 'vm',
        resolve: {
          collegemapResolve: getCollegemap
        },
        data: {
          pageTitle: 'Collegemap {{ collegemapResolve.name }}'
        }
      });
  }

  getCollegemap.$inject = ['$stateParams', 'CollegemapsService'];

  function getCollegemap($stateParams, CollegemapsService) {
    return CollegemapsService.get({
      collegemapId: $stateParams.collegemapId
    }).$promise;
  }

  newCollegemap.$inject = ['CollegemapsService'];

  function newCollegemap(CollegemapsService) {
    return new CollegemapsService();
  }
}());
