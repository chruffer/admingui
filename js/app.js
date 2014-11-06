'use strict'

var paymentAdminApp = angular.module('paymentAdminApp',[
	'ngRoute',
	'adminControllers'
	]);

paymentAdminApp.config(['$routeProvider', '$httpProvider',
	function($routeProvider, $httpProvider) {

		$httpProvider.interceptors.push('httpInterceptor');
		

		$routeProvider.
			when('/login', {
				templateUrl: 'partials/loginscreen.html',
				controller: 'LoginCtrl'
			}).
			when('/adminpanel', {
				templateUrl: 'partials/adminpanel.html',
				controller: 'AdminCtrl'				
			}).

			otherwise({
				redirectTo: '/login'
			});
	}
]);

// this interceptor is used for auth checking on every req
paymentAdminApp.factory('httpInterceptor', ['$q', '$location', '$log', function($q, $location, $log) {
	return {
		'response': function(response) {

		  // redirect to login
		 $log.info(response.status + ' Valid interceptor running(inactive)')
		  
		  return response;
		},

		'responseError': function(response) {
			$log.info('interceptor responseError'+response.status )
			if (response.status == 415 || response.status == 401 ){
				$location.url('/login');
		  }


		  // redirect to login


		  $log.info('Final status response: ' + response.status)
		  return $q.reject(response);
		  //return response;
		}
	};
}]);
