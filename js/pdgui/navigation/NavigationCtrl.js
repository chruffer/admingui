'use strict'
var navigationModule = angular.module('navigationModule',[]);

navigationModule.controller('NavCtrl', ['$scope','$location', function($scope,$location){

	$scope.menu = [
			{text: 'Admin Panel', href:'/#/'},
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
			{text: 'Currency', href:'/#/currency'},
			{text: 'Logout', href:'/#/login'}

	]
	
}]);
