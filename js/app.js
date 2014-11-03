'use strict'

var paymentAdminApp = angular.module('paymentAdminApp',[
	'ngRoute',
	'adminControllers'
	]);

paymentAdminApp.config(['$routeProvider', '$httpProvider',
	function($routeProvider, $httpProvider) {

		
		$httpProvider.interceptors.push('httpInterceptor')

		$routeProvider.
			when('/login', {
				templateUrl: 'partials/loginscreen.html',
				controller: 'LoginCtrl'
			}).
			when('/adminpanel', {
				templateUrl: 'partials/layout.html',
				controller: 'AdminCtrl'				
			}).
			otherwise({
				redirectTo: '/login'
			});
	}
]);

// this interceptor is used for auth checking on every req
paymentAdminApp.factory('httpInterceptor', ['$q', '$location', function($q, $location) {
	return {
		'response': function(response) {
		  // redirect to login
		  if (response.status === 401){
		  	$location.path('login')
		  }
		  return response;
		}
	};
}]);
