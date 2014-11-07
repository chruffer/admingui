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

adminControllers.controller('NavCtrl', ['$scope','$location', function($scope,$location){
	$scope.breadcrumbs = [];
	$scope.menu = [
			{text: 'Admin Panel', href:'/#/adminpanel'},
			{text: 'Principal', href:'/#/princial', children: [
				{text:'Create new Principal', href:'/#/createprincipal'},
				{text:'View Principals', href:'/#/viewprincipal'},
				{text:'Modify Principals', href:'/#/modifyprincipal'}
			]},
			{text: 'Project', href:'/#/project', children: [
				{text:'Create new Project', href:'/#/createproject'},
				{text:'View Projects', href:'/#/viewproject'},
				{text:'Modify Projects', href:'/#/modifyproject'}
			]},
			{text: 'Principal', href:'/#/provider', children: [
				{text:'Create new Provider', href:'/#/createprovider'},
				{text:'View Providers', href:'/#/viewprovider'},
				{text:'Modify Provider', href:'/#/modifyprovider'}
			]},
			{text: 'Logout', href:'/#/adminpanel'}
	]

	
}]);


adminControllers.directive('navMenu', ['$parse', '$compile', function($parse, $compile) {
    return {
        restrict: 'C', //Element
        scope:true,
        link: function (scope, element, attrs)
        {
            scope.selectedNode = null;

            scope.$watch( attrs.menuData, function(val)
            {

                var template = angular.element('<ul class="nav navbar-nav" id="parentTreeNavigation"><li ng-repeat="node in ' + attrs.menuData + '" ng-class="{active:node.active && node.active==true, \'has-dropdown\': !!node.children && node.children.length}"><a ng-href="{{node.href}}" ng-click:"{{node.click}} {{node.special}}" target="{{node.target}}" >{{node.text}}</a><sub-navigation-tree></sub-navigation-tree></li></ul>');

                var linkFunction = $compile(template);
                linkFunction(scope);
                element.html(null).append( template );

            }, true );
        }
    };
}])
.directive('subNavigationTree', ['$compile', function($compile)
{
    return {
        restrict: 'E', //Element
        scope:true,
        link: function (scope, element, attrs)
        {
            scope.tree = scope.node;

            if(scope.tree.children && scope.tree.children.length )
            {
                var template = angular.element('<ul class="dropdown "><li class="active" ng-repeat="node in tree.children" node-id={{node.' + attrs.nodeId + '}}  ng-class="{active:node.active && node.active==true, \'has-dropdown\': !!node.children && node.children.length}"><a ng-href="{{node.href}}" ng-click:"{{node.click}}" target="{{node.target}}" ng-bind-html-unsafe="node.text">{{node.text}}</a><sub-navigation-tree tree="node"></sub-navigation-tree></li></ul>');

                var linkFunction = $compile(template);
                linkFunction(scope);
                element.replaceWith( template );
            }
            else
            {
                element.remove();
            }
        }
     };
}]);









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



adminControllers.controller('PrincipalCtrl', ['$scope', '$http', '$log', '$location',
	function($scope, $http, $log, $location){

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