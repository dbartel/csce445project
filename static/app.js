define([
	"angular", 
	"angularRoute",
	"app/landing/landing",
	"app/dashboard/dashboard",
	"app/planning/planning",
	"app/project/project",
	"app/retrospective/retrospective",
	"app/sprint/sprint"
], function(angular, angularRoute, landing) {
	return angular.module('agileApp', [
		"ui.router", 
		"agileApp.landing",
		"agileApp.dashboard",
		"agileApp.planning",
		"agileApp.project",
		"agileApp.retrospective",
		"agileApp.sprint",
		"mm.foundation"
	]);
});