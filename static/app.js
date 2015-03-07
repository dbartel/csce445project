define([
	"angular", 
	"angularRoute",
	"app/landing/landing",
	"app/dashboard/dashboard"

], function(angular, angularRoute, landing) {
	return angular.module('agileApp', [
		"ui.router", 
		"agileApp.landing",
		"agileApp.dashboard"
	]);
});