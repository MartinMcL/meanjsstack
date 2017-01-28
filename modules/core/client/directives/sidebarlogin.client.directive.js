(function () {
    'use strict';

    angular
        .module('core')
        .directive('sidelog', sidelog);

    sidelog.$inject = ['$compile'];
    /** @ngInject */
    function sidelog($compile) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'modules/users/client/views/authentication/sidebarsignin.client.view.html',
            link: function (scope, element, attrs) {
                
            }
        };
    }

} ());