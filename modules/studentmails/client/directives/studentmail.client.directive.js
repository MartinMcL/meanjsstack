// /*
// * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
// */

// (function () {
//   angular
//   .module('studentmails', [
//     'ngRoute',
//     'AdalAngular'
//   ])
//     .directive('look', look)
// 	//.config(config);
//     look.$inject = ['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider'];
//   function look($routeProvider, $httpProvider, adalAuthenticationServiceProvider) {
// return {
//       restrict: 'A',
//       scope: true,
//       templateUrl: 'modules/collegemaps/client/views/studentmails.client.view.html',
//       link: function (scope, element, attrs) {
//        $routeProvider
// 			.when('/', {
// 				templateUrl: 'views/home.html',
// 				controller: 'HomeController',
// 				controllerAs: 'home',
// 				requireADLogin: true
// 			})

// 			.otherwise({
// 				redirectTo: '/'
// 			});

// 		// The endpoints here are resources for ADAL to get tokens for.
// 		var endpoints = {
// 			'https://outlook.office365.com': 'https://outlook.office365.com'
// 		};

// 		// Initialize the ADAL provider with your tenant name and clientID (found in the Azure Management Portal).
// 		adalAuthenticationServiceProvider.init(
// 			{
// 				tenant: 'http://bamsdevitsligo.onmicrosoft.com',
// 				clientId: '3b1ee9a4-5943-470a-bc8b-cf1e1a745188',
// 				endpoints: endpoints,
// 				cacheLocation: 'localStorage'
// 			},
// 			$httpProvider
// 			);
// 	}
// }
//   // Configure the routes.
// //function config($routeProvider, $httpProvider, adalAuthenticationServiceProvider) {
		
// }
// }());
