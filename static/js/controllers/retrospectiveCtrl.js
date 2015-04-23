app.controller("retrospectiveCtrl", ["$scope", "$http", function($scope, $http) {
    $scope.sprintSelected = false;
    $scope.selectedSprint = {};
    $scope.sprints = [];

    $http({
        method: "GET",
        url: "/listsprints/" + projectOwner + "/" + projectName
    }).success(function(data, status, headers, config) {
        $scope.sprints = data;
    });


    $scope.fetchSprint = function(id) {
        $http({
            method: "GET",
            url: "/burndown/" + projectOwner + "/" + projectName,
            params: {
                sprintid: id
            }
        }).success(function(data, status, headers, config) {
            $scope.selectedSprint = data;
            $scope.sprintSelected = true;
        })
    };

    $scope.goBack = function() {
        $scope.selectedSprint = {};
        $scope.sprintSelected = false;
    }

}]);
