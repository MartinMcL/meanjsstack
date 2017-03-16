(function () {
  'use strict';

  angular
    .module('studentmails')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Studentmails',
      state: 'studentmails',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'studentmails', {
      title: 'List Studentmails',
      state: 'studentmails.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'studentmails', {
      title: 'Create Studentmail',
      state: 'studentmails.create',
      roles: ['user']
    });
  }
}());
