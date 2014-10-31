'use strict'

var paymentAdminApp = angular.module('paymentAdminApp',[
	'ngRoute',
	'adminControllers'
	]);

paymentAdminApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/login', {
				templateUrl: 'partials/loginscreen.html',
				controller: 'LoginCtrl'
			}).
			when('/adminpanel', {
				templateUrl: 'partials/layout.html'
			}).
			otherwise({
				redirectTo: '/login'
			});
	
}]);