'use strict'

var principalModule = angular.module('principalModule',[]);

principalModule.controller('PrincipalCtrl', ['$scope', '$http', '$log', '$location',
	function($scope, $http, $log, $location){

		$scope.createPrincipalFunc = function(){
			if ($scope.newPrincipalName != ""){
				$http({
					url: 'http://localhost:8080/v1/principal',
					dataType: 'json',
					method: 'PUT',
					data: {"Name": $scope.newPrincipalName},
					headers:{
						"ContentType": "application/json"
					}	
				})
			}
			
			else {
				alert("Enter new Principal Name")
			}
		};
	

		$scope.viewPrincipalFunc = function(){
			if ($scope.viewPrincipal != ""){
				$http.get("http://localhost:8080/v1/principal/" + $scope.viewPrincipal).
				success(function(data){
					$scope.principal = data.Response
				}).
				error(function(data){
					$log.error("AP user call failed / Principal not found")
				})


			} else {
				alert("Enter new Principal Name");
			}
		};

}]);
