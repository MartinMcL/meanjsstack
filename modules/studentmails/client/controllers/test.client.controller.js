(function() {
'use strict';

    angular
        .module('studentmails')
        .controller('test', test);

    test.inject = ['$scope'];
    function test($scope) {
        console.log("works");
    }
})();