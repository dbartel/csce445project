app.controller("planningCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
	$scope.backlog = [];
    $scope.currentSprint = [];

    var projectName = $location.path().split("/")[2] || "";

    // Get the backlog
    $http({
        method: "GET",
        url: "/issues/" + projectName
    }).success(function(data,status,headers,config) {
        $scope.backlog = data;
    });

}]);