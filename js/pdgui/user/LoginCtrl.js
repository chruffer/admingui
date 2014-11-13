'use strict'

userModule.controller('LoginCtrl', ['$scope', '$http', '$log', '$location',
 	function($scope, $http, $log, $location){

		$scope.$log = $log

		$scope.login = function(){
			$http({
    				url: 'http://localhost:8080/v1/authorization/text',
    				dataType: 'text',
    				method: 'POST',
    				data: $scope.pwd,
   					headers: {
        				"Content-Type": "text/plain"
    				}
    			}).
  				success(function(data, status, headers, config) {
  					$location.url('/');
				}).
				error(function(data, status, headers, config) {
  					$location.url('/login')
				})
		};

		// manual logout via "ng-controller='LoginCtrl'"
		$http.delete("http://localhost:8080/v1/authorization").
			success(function(data, status, headers, config) {
				$location.url('/login');
			}).
			error(function(data, status, headers, config) {
				$log.info("logout failed")
			})
}])