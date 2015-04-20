// Bootstrap angular application

var app = angular.module("agilApp", ["ui.bootstrap"], function() {
});

//set custom angular brackets so we don't interfere with flask templating
app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

