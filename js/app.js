'use strict'

var paymentAdminApp = angular.module('paymentAdminApp',[
	'ngRoute'
	]);

paymentAdminApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/login', {
				templateUrl: 'partials/loginscreen.html'
			}).
			when('/adminpanel', {
				templateUrl: 'partials/layout.html'
			}).
			otherwise({
				redirectTo: '/login'
			});
	
}]);