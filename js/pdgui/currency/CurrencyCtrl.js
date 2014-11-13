'use strict'
var currencyModule = angular.module('currencyModule',[]);

currencyModule.controller('CurrencyCtrl', ['$scope', '$http', '$log', '$location',
 	function($scope, $http, $log, $location){

		$http({
				url: 'http://localhost:8080/v1/currency',
				dataType: 'json',
				method: 'GET'
			}).
			success(function(data, status, headers, config) {
				$scope.currency = data.Response;

			}).
			error(function(data, status, headers, config) {
				$scope.$currency = data.Status;	
			})
	
}])