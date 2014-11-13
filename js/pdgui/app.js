'use strict'

var paymentAdminApp = angular.module('paymentAdminApp',[
	'ngRoute',
	'indexControllers',
	'navigationModule',
	'currencyModule',
	'principalModule',
	'userModule'
	]);

paymentAdminApp.config(['$routeProvider', '$httpProvider',
	function($routeProvider, $httpProvider) {
		$httpProvider.interceptors.push('httpInterceptor');
		$routeProvider.
			when('/login', {
				templateUrl: 'partials/loginscreen.html',
				controller: 'LoginCtrl'
			}).
			when('/', {
				templateUrl: 'partials/adminpanel.html',
				controller: 'IndexCtrl'
			}).	
			when('/currency', {
				templateUrl: 'partials/currency.html',
				controller: 'CurrencyCtrl'
			}).
			when('/createprincipal', {
				templateUrl: 'partials/principal.html',
				controller: 'PrincipalCtrl'
			}).
			otherwise({
				redirectTo: '/adminpanel'
			});
	}
]);

// this interceptor is used for auth checking on every http req
paymentAdminApp.factory('httpInterceptor', ['$q', '$location', '$log', function($q, $location, $log) {
	return {

		// Valid response Interceptor
		'response': function(response) {
			$log.info(response.status + ' Valid interceptor running(inactive)')
		  	return response;
		},
		// Error response Interceptor
		'responseError': function(response) {
			if (response.status == 401){
				$location.url('/login');
			}
		  return $q.reject(response);
		}
	};
}]);


var basicControllers = angular.module('indexControllers',[]);

basicControllers.controller('IndexCtrl', ['$scope', '$http', '$log', '$location',
	function($scope, $http, $log, $location){
		$http.get("http://localhost:8080/v1/user").
			success(function(data){
				$log.info(data.Response)
				$scope.user = data.Response
			}).
			error(function(data){
				$log.error("AP user call failed")
			});
}])

basicControllers.directive('navMenu', ['$parse', '$compile', function($parse, $compile) {
    return {
        restrict: 'C', //Class
        scope:true,
        templateUrl: 'partials/navigation.html'
    };
}])