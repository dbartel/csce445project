require.config({
	baseUrl: "/static/",
	paths: {
		angular: "/static/lib/angular/angular",
		angularRoute: "/static/lib/angular/angular-ui-router.min",
		angularFoundation: "/static/lib/foundation/js/mm-foundation-tpls-0.5.1.min"
	},
	shim: {
		"angular" : {"exports" : "angular"},
		"angularRoute" : {
			deps: ["angular"]
		},
		"angularFoundation": {
			deps: ["angular"]
		}
	},
	deps: [
		"./bootstrap"
	]
});

