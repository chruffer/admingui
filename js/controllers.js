'use strict'

var adminControllers = angular.module('adminControllers',[]);

adminControllers.controller('LoginCtrl', ['$scope', '$http', '$log',
 	function($scope, $http, $log){

		$scope.$log = $log
		
		$scope.login = function(){
			$http.get("http://localhost:8080/v1/authorization/basic").
  				success(function(data, status, headers, config) {
  					// @todo 
					$log.info("success")
				}).
				error(function(data, status, headers, config) {
  					// @todo 
					$log.info("fail")
				})
		}
}])

adminControllers.controller('AdminCtrl', ['$scope', '$http', '$log',
	function($scope, $http, $log){
		$log.info('test')

}])