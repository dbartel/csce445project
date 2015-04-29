app.controller("sprintCtrl", ["$scope", "$http", "$modal", function($scope, $http, $modal) {
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
				$scope.myIssues = _.filter($scope.assignedIssues, function(i) {return i.assignee.login == userName});
			}
		});
	};

	$scope.openModal = function(issue) {
		var modalInstance = $modal.open({
            templateUrl: "issueModal.html",
            controller: ModalCtrl,
            size: "lg",
            resolve: {
                issue: function() {return issue;},
            }
        });
	};


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


	var ModalCtrl = function($scope, $modalInstance, $http, issue) {
		$scope.issue = issue;
		$scope.users = [];

		$scope.difficulty = {
			present: false,
			name: ""
		};

		if ($scope.issue.labels != []) {

			var diff = _.find($scope.issue.labels, function(l) {
                return l.name == "high" ||
                l.name == "medium" ||
                l.name == "low";
            }) || false;

            if (!diff) $scope.difficulty.present = false;
            else {
            	$scope.difficulty.name = diff.name;
				$scope.difficulty.present = true;
            }
		}

		if (!$scope.issue.assignee) {
			$http({
				method: "GET",
				url: "/" + projectOwner + "/" + projectName + "/users"
			}).success(function(data, status, headers, config) {
				$scope.users = data;
				$scope.assignedUser = userName;
			});
		}

		$scope.closeIssue = function() {
			$http({
				method: "POST",
				url: "/" + projectName + "/" + projectOwner + "/closeissue/" + issue.number
			}).success(function(data, status,headers,config) {
				getSprintInfo();
				$scope.close();
			})
		};



		$scope.close = function() {
			$modalInstance.dismiss();
		};

		$scope.assignIssue = function(user) {
			$http({
				method: "POST",
				url: "/currentsprint/" + projectName,
				params: {
					owner: projectOwner,
					issueid: issue.number,
					assignee: $scope.assignedUser,
					sprintid: issue.milestone.number
				}
			}).success(function(data, status, headers, config) {
				getSprintInfo();
				$scope.close();
			})
		};

	};


}]);