app.controller("sprintCtrl", ["$scope", "$http", function($scope, $http) {
	// ...
	$scope.sprintActive = false;
	$scope.noIssues = true;

	var getIssues = function(sprintId) {
		$http({
			method: "GET",
			url: "/issues/" + projectName,
			params: {
				sprintid: sprintId,
				owner: projectOwner
			}
		}).success(function(data, status, headers, config) {
			if (status == 204) {
				$scope.noIssues = true;
			}
			else {
				$scope.noIssues = false;
				$scope.issues = data;

				//Separate out assigned/unassigned issues
				$scope.assignedIssues = _.filter($scope.issues, function(i) { return i.assignee != null});
				$scope.unassignedIssues = _.filter($scope.issues, function(i) { return i.assignee == null});
			}
		});
	}


	var getSprintInfo = function() {
		$http({
			method: "GET",
			url: "/sprints/" + projectName,
			params: {
				owner: projectOwner
			}
		}).success(function (data, status, headers, config) {
			if (status == 200) {
				$scope.sprint = data;
				$scope.sprintActive = true;
				getIssues($scope.sprint.number);
			}
			else {
				$scope.sprintActive = false;
			}
		});
	};
	getSprintInfo();


}]);