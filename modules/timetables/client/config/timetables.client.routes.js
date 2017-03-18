(function () {
  'use strict';

  angular
    .module('timetables')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('timetables', {
        abstract: true,
        url: '/timetables',
        templateUrl: 'modules/timetables/client/views/timetable.client.view.html',
        controller: 'TimetablesController',
        directive: 'timetable',
        data: {
          pageTitle: 'Timetable'
        }
      })
      .state('timetables.list', {
        url: '',
        templateUrl: 'modules/timetables/client/views/list-timetables.client.view.html',
        controller: 'TimetablesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Timetables List'
        }
      })
      .state('timetables.create', {
        url: '/create',
        templateUrl: 'modules/timetables/client/views/form-timetable.client.view.html',
        controller: 'TimetablesController',
        controllerAs: 'vm',
        resolve: {
          timetableResolve: newTimetable
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Timetables Create'
        }
      })
      .state('timetables.edit', {
        url: '/:timetableId/edit',
        templateUrl: 'modules/timetables/client/views/form-timetable.client.view.html',
        controller: 'TimetablesController',
        controllerAs: 'vm',
        resolve: {
          timetableResolve: getTimetable
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Timetable {{ timetableResolve.name }}'
        }
      })
      .state('timetables.view', {
        url: '/:timetableId',
        templateUrl: 'modules/timetables/client/views/view-timetable.client.view.html',
        controller: 'TimetablesController',
        controllerAs: 'vm',
        resolve: {
          timetableResolve: getTimetable
        },
        data: {
          pageTitle: 'Timetable {{ timetableResolve.name }}'
        }
      });
  }

  getTimetable.$inject = ['$stateParams', 'TimetablesService'];

  function getTimetable($stateParams, TimetablesService) {
    return TimetablesService.get({
      timetableId: $stateParams.timetableId
    }).$promise;
  }

  newTimetable.$inject = ['TimetablesService'];

  function newTimetable(TimetablesService) {
    return new TimetablesService();
  }
}());
