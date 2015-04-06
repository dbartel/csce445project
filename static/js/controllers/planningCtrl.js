app.controller("planningCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
	$scope.backlog = [];
    $scope.currentSprint = [];
    $scope.activeSprintExists = true;
    $scope.currentSprintNumber = 0;

    var projectName = $location.path().split("/")[3] || "";
    var projectOwner = $location.path().split("/")[2] || "";

    //Get the active sprint

    var refreshSprint = function() {
         $http({
            method: "GET",
            url: "/sprints/" + projectName,
            params: {
                "owner": projectOwner
            }
        }).success(function(data,status,headers,config) {
            var sprints = data;
            if (sprints.length == 0) {
                //There is no current sprint
                $scope.activeSprintExists = false;
                $scope.currentSprintNumber = 1;
            }
            else {
                //fetch issues for most recent sprint
                $scope.currentSprintNumber = sprints[0].number;
                $scope.sprintName = sprints[0].title
                $http({
                    method: "GET",
                    url: "/issues/" + projectName,
                    params: { 
                        "sprintid": $scope.currentSprintNumber,
                        "owner": projectOwner
                }
                }).success(function(data,status,headers,config) {
                    $scope.currentSprint = data;
                });
            }
        });       
    }
    refreshSprint();

    var refreshBacklog = function() {
     // Get the backlog
        $http({
            method: "GET",
            url: "/backlog/" + projectName,
            params: {
                owner: projectOwner
            }
        }).success(function(data,status,headers,config) {
            $scope.backlog = data;
        });       
    }
    refreshBacklog();



    $scope.addToSprint = function(issue) {
        $http({
            method: "POST",
            url: "/currentsprint/" + projectName,
            params: {
                sprintid: $scope.currentSprintNumber,
                issueid: issue.number,
                owner: projectOwner
            }
        }).success(function(data,status,headers,config) {
            refreshSprint();
            refreshBacklog();
        })
    };

    $scope.createNewSprint = function() {
        var dueDate = $scope.newSprintDate.toISOString();
        dueDate = dueDate.substr(0, dueDate.length - 5) + "Z";

        var title = "Sprint:" + dueDate;
        $http({
            method: "POST",
            url: "/sprints/" + projectName,
            params: {
                title: title,
                due_on: dueDate
            }
        })
        .success(function(data, status, headers, config) {
            refreshSprint();
            refreshBacklog();
        });
    };

}]);