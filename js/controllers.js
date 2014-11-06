'use strict'

var adminControllers = angular.module('adminControllers',[]);

adminControllers.controller('LoginCtrl', ['$scope', '$http', '$log', '$location',
 	function($scope, $http, $log, $location){

		$scope.$log = $log

		$scope.login = function(){
			$log.info('login function call')
			//$http.defaults.headers.post['ContentType'] = 'text/plain'
			$http({
    				url: 'http://localhost:8080/v1/authorization/text',
    				dataType: 'text',
    				method: 'POST',
    				data: $scope.pwd,
   					headers: {
        				"Content-Type": "text/plain"
    				}
    			}).
				error(function(data, status, headers, config) {
  					$location.url('/login')
					$log.info("fail")
				}).
  				success(function(data, status, headers, config) {
  					$location.url('/adminpanel');
					$log.info("success" + status + data)
				})
		};


		$scope.logout = function(){
			$log.info('logout function call')
			//$http.defaults.headers.post['ContentType'] = 'text/plain'
			$http.delete("http://localhost:8080/v1/authorization").
  				success(function(data, status, headers, config) {
  					$location.url('/login');
					$log.info(data)
				}).
				error(function(data, status, headers, config) {
					$log.info("logout failed")
				})
		};
		
}])

adminControllers.controller('AdminCtrl', ['$scope', '$http', '$log', '$location',
	function($scope, $http, $log, $location){
		$http.get("http://localhost:8080/v1/user").
			success(function(data){
				$log.info(data.Response)
				$scope.user = data.Response
			}).
			error(function(data){
				$log.error("AP user call failed")
			});

		$log.info('adminController user');

		// Function: Add New Principal

		$scope.createPrincipalFunc = function(){
			//$log.info("Principal Name: " + $scope.newPrincipalName)
			if ($scope.newPrincipalName > ""){
				$log.info("Principal Name: " + $scope.newPrincipalName)
				$http({
					url: 'http://localhost:8080/v1/principal',
					dataType: 'json',
					method: 'PUT',
					data: {"Name": $scope.newPrincipalName},
					headers:{
						"ContentType": "application/json"
					}	
				}).	
				error(function(data){
					$log.info(data)
				})
			}
			
			else {
				alert("Enter new Principal Name")
			}
		}



}])

