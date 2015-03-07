define([
	"angular",
	"angularRoute"], function(angular) {
		return angular.module("agileApp.dashboard", ["ui.router"])
			.controller("DashboardCtrl", ["$scope", function($scope) {

				//filler data for display purposes
				$scope.projects = [
					"Project 1",
					"Project 2",
					"Project 3"
				];
				
			}]);
});