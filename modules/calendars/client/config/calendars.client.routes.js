(function () {
  'use strict';

  angular
    .module('calendars')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('calendars', {
        abstract: true,
        url: '/calendars',
        templateUrl: 'modules/calendars/client/views/calendar.client.view.html',
        controller: 'CalendarsMainCtrl',
        directive: 'calendar',
        data: {
          pageTitle: 'Calendar Info'
        }
      })
      .state('calendars.list', {
        url: '',
        templateUrl: 'modules/calendars/client/views/list-calendars.client.view.html',
        controller: 'CalendarsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Calendars List'
        }
      })
      .state('calendars.create', {
        url: '/create',
        templateUrl: 'modules/calendars/client/views/form-calendar.client.view.html',
        controller: 'CalendarsController',
        controllerAs: 'vm',
        resolve: {
          calendarResolve: newCalendar
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Calendars Create'
        }
      })
      .state('calendars.edit', {
        url: '/:calendarId/edit',
        templateUrl: 'modules/calendars/client/views/form-calendar.client.view.html',
        controller: 'CalendarsController',
        controllerAs: 'vm',
        resolve: {
          calendarResolve: getCalendar
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Calendar {{ calendarResolve.name }}'
        }
      })
      .state('calendars.view', {
        url: '/:calendarId',
        templateUrl: 'modules/calendars/client/views/view-calendar.client.view.html',
        controller: 'CalendarsController',
        controllerAs: 'vm',
        resolve: {
          calendarResolve: getCalendar
        },
        data: {
          pageTitle: 'Calendar {{ calendarResolve.name }}'
        }
      });
  }

  getCalendar.$inject = ['$stateParams', 'CalendarsService'];

  function getCalendar($stateParams, CalendarsService) {
    return CalendarsService.get({
      calendarId: $stateParams.calendarId
    }).$promise;
  }

  newCalendar.$inject = ['CalendarsService'];

  function newCalendar(CalendarsService) {
    return new CalendarsService();
  }
}());
