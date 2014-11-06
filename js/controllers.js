'use strict'

var adminControllers = angular.module('adminControllers',[]);

//	include Controller (inactive)

/*paymentAdminApp.controller('includeCtrl',['$scope', function($scope){
	$scope.templates = 
		[ 	{name: 'navbar', url: 'partials/navbar.html'},
			{name: 'navbarblack', url: 'partials/navbarblack.html'},
		];
	$scope.template = $scope.templates[0];
}]);*/

adminControllers.controller('LoginCtrl', ['$scope', '$http', '$log', '$location',
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
				error(function(data, status, headers, config) {
  					$location.url('/login')
				}).
  				success(function(data, status, headers, config) {
  					$location.url('/adminpanel');
				})
		};

		// manual logout via "ng-controller='LoginCtrl'"

		$scope.logout = function(){
			//$http.defaults.headers.post['ContentType'] = 'text/plain'
			$http.delete("http://localhost:8080/v1/authorization").
  				success(function(data, status, headers, config) {
  					$location.url('/login');
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


		$scope.principals = [
		{'id': '1', 'name': 'firma1','author': 'author1' },
		{'id': '2', 'name': 'firma2','author': 'author2' },
		{'id': '3', 'name': 'firma3','author': 'author3' },
		];	

		/*$http.get("http://localhost:8080/v1/princial").
			success(function(data){
				$log.info(data.Response)
				$scope.principals = data.Response
			}).
			error(function(data){
				$log.error("AP user call failed")
			});*/


		// Function: Add New Principal

		$scope.createPrincipalFunc = function(){
			if ($scope.newPrincipalName > ""){
				$http({
					url: 'http://localhost:8080/v1/principal',
					dataType: 'json',
					method: 'PUT',
					data: {"Name": $scope.newPrincipalName},
					headers:{
						"ContentType": "application/json"
					}	
				}).	
				error(function(){
				}).
				success(function(){

				})
			}
			
			else {
				alert("Enter new Principal Name")
			}
		}



}])

