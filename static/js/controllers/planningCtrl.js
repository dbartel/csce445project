app.controller("planningCtrl", ["$scope", "$http", "$location", "$modal", function($scope, $http, $location, $modal) {
	$scope.backlog = [];
    $scope.currentSprint = [];
    $scope.activeSprintExists = true;
    $scope.currentSprintNumber = 0;

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
                $scope.currentSprintNumber = sprints.number;
                $scope.sprintName = sprints.title;
                $scope.activeSprintExists = true;
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

    $scope.openModal = function(issue, inSprint) {
        var modalInstance = $modal.open({
            templateUrl: "issueModal.html",
            controller: ModalCtrl,
            size: "lg",
            resolve: {
                issue: function() {return issue;},
                sprintid: function() {return $scope.currentSprintNumber;},
                issueInSprint: function() {return inSprint;}
            }
        });
    };

    $scope.createNewSprint = function() {
        var dueDate = $scope.dt

        //Title of milestone will be it's due date?
        //Maybe we want to just iterate a number instead and use gh due date
        var title = dueDate.toDateString();
        $http({
            method: "POST",
            url: "/sprints/" + projectName,
            params: {
                title: title,
                due_on: dueDate,
                owner: projectOwner
            }
        })
        .success(function(data, status, headers, config) {
            console.log("Success");
            refreshSprint();
            refreshBacklog();
            

        });
    };


    var ModalCtrl = function($scope, $modalInstance, $http, issue, sprintid, issueInSprint) {
        $scope.issue = issue;
        $scope.issueInSprint = issueInSprint;

        $scope.close = function() {
            $modalInstance.dismiss();
        }

        $scope.addToSprint = function() {
            $http({
                method: "POST",
                url: "/currentsprint/" + projectName,
                params: {
                    sprintid: sprintid,
                    issueid: $scope.issue.number,
                    owner: projectOwner
                }
            }).success(function(data,status,headers,config) {
                refreshSprint();
                refreshBacklog();
                $scope.close();
            });

        }; 

        $scope.removeFromSprint = function() {
            $http({
                method: "POST",
                url: "/currentsprint/" + projectName,
                params: {
                    sprintid: "clear",
                    issueid:$scope.issue.number,
                    owner: projectOwner

                }
            }).success(function(data, status, headers, config) {
                refreshSprint();
                refreshBacklog();
                $scope.close();
            });
        };


    }

}]);