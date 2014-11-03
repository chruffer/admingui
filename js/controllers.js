'use strict'

var adminControllers = angular.module('adminControllers',[]);

adminControllers.controller('LoginCtrl', ['$scope', '$http',
 	function($scope, $http){

		$scope.login = function(){
			$http.get('http://localhost:8080/v1/authorization/basic')
		};
		$scope.logout = function(){
			$http.delete('http://localhost:8080/v1/authorization')
		};
	}]);