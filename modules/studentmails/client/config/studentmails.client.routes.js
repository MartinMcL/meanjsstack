(function () {
  'use strict';

  angular
    .module('studentmails')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('studentmails', {
        abstract: true,
        url: '/studentmails',
        templateUrl: 'modules/studentmails/client/views/studentmails.client.view.html',
        controller: "StudentmailsController",
        directive: 'myMail'
      })
      .state('studentmails.list', {
        url: '',
        templateUrl: 'modules/studentmails/client/views/list-studentmails.client.view.html',
        controller: 'StudentmailsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Studentmails List'
        }
      })
      .state('studentmails.create', {
        url: '/create',
        templateUrl: 'modules/studentmails/client/views/form-studentmail.client.view.html',
        controller: 'StudentmailsController',
        controllerAs: 'vm',
        resolve: {
          studentmailResolve: newStudentmail
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Studentmails Create'
        }
      })
      .state('studentmails.edit', {
        url: '/:studentmailId/edit',
        templateUrl: 'modules/studentmails/client/views/form-studentmail.client.view.html',
        controller: 'StudentmailsController',
        controllerAs: 'vm',
        resolve: {
          studentmailResolve: getStudentmail
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Studentmail {{ studentmailResolve.name }}'
        }
      })
      .state('studentmails.view', {
        url: '/:studentmailId',
        templateUrl: 'modules/studentmails/client/views/view-studentmail.client.view.html',
        controller: 'StudentmailsController',
        controllerAs: 'vm',
        resolve: {
          studentmailResolve: getStudentmail
        },
        data: {
          pageTitle: 'Studentmail {{ studentmailResolve.name }}'
        }
      });
  }

  getStudentmail.$inject = ['$stateParams', 'StudentmailsService'];

  function getStudentmail($stateParams, StudentmailsService) {
    return StudentmailsService.get({
      studentmailId: $stateParams.studentmailId
    }).$promise;
  }

  newStudentmail.$inject = ['StudentmailsService'];

  function newStudentmail(StudentmailsService) {
    return new StudentmailsService();
  }
}());
