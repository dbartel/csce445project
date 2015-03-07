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
			})

			//Project nested states
			.state("project", {
				templateUrl: "/static/app/project/project.html",
				controller: "ProjectCtrl"
			})
			.state("project.planning", {
				url: "/planning",
				templateUrl: "/static/app/planning/planning.html",
				controller: "PlanningCtrl"
			})
			.state("project.sprint", {
				url: "/sprint",
				templateUrl: "/static/app/sprint/sprint.html",
				controller: "SprintCtrl"
			})
			.state("project.retrospective", {
				url: "/retrospective",
				templateUrl: "/static/app/retrospective/retrospective.html",
				controller: "RetrospectiveCtrl"
			})			

	}]);
});