require.config({
	baseUrl: "/static/",
	paths: {
		angular: "/static/lib/angular/angular",
		angularRoute: "/static/lib/angular/angular-ui-router.min"
	},
	shim: {
		"angular" : {"exports" : "angular"},
		"angularRoute" : {
			deps: ["angular"]
		}
	},
	deps: [
		"./bootstrap"
	]
});

