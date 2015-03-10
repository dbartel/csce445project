define([
	"angular",
	"angularRoute"], function(angular) {
		return angular.module("agileApp.dashboard", ["ui.router"])
			.controller("DashboardCtrl", ["$scope", function($scope) {

				//filler data for display purposes
				$scope.projects = [
				{
					name: "Project 1",
					description: "This is the description for project 1",
				},
				{
					name: "Project 2",
					description: "This is the description for project 2"
				},
				{
					name: "Project 3",
					description: "This is the description for project 3"
				}								

				];
				
			}]);
});