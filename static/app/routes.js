define([
	"app"
], function(app) {
	return app.config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider) {
		// $urlRouterProvider.otherwise("/");
		$urlRouterProvider.otherwise("/landing");
		$stateProvider
			.state("landing", {
				url:"/landing", 
				templateUrl: "/static/app/landing/landing.html",
				controller: "LandingCtrl"
			})
			.state("dashboard", {
				url: "/dashboard",
				templateUrl: "/static/app/dashboard/dashboard.html",
				controller: "DashboardCtrl"
			});

	}]);
});