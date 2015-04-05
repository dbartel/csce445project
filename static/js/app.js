// Bootstrap angular application

var app = angular.module("agilApp", [], function($locationProvider) {
    //Turn on html5mode so we can access full url
    $locationProvider.html5Mode(true);
});

//set custom angular brackets so we don't interfere with flask templating
app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

