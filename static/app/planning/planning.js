define([
	"angular",
	"angularRoute",
	"angularFoundation"], function(angular) {
		return angular.module("agileApp.planning", ["ui.router"])
			.controller("PlanningCtrl", ["$scope", function($scope) {

				$scope.backlog = [
				{
					title: "Issue 1",
					body: "this is an issue i'm having"
				},
				{
					title: "Issue 2",
					body: "This is an issue 2 that i'm having"
				}
				];

				$scope.currentSprintIssues = [
				{
					title: "CurrentIssue 1",
					body: "this is aCurrentIssue i'm having"
				},
				{
					title: "CurrentIssue 2",
					body: "This is a CurrentIssue 2 that i'm having"
				}
				];


			}]);
});