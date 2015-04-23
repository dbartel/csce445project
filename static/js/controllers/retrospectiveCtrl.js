app.controller("retrospectiveCtrl", ["$scope", "$http", function($scope, $http) {
    $scope.sprintSelected = false;
    $scope.selectedSprint = {};
    $scope.sprints = [];

    //chart variable
    $scope.chart = {
        config:{
             title: "Burndown Chart",
             tooltips: true,
             labels:false,
             mouseover: function() {},
             mouseout: function() {},
             click: function() {},
             legend: {
                 display:false,
                 position:"left",
                 htmlEnabled:false
             },
             lineLegend:"lineEnd",
             lineCurveType:"linear",
             yAxisTickFormat:"s",
             isAnimate:true,
             xAxisTickFormat:"s",
             waitForHeightAndWidth:false
        },
        data:{},
        type: "line"
    };





    $http({
        method: "GET",
        url: "/listsprints/" + projectOwner + "/" + projectName
    }).success(function(data, status, headers, config) {
        $scope.sprints = data;
    });

    // Transform sprint information into angular-chart friendly object
    var buildChartData = function(data) {

        var startTS = moment(data.sprintinfo.start, "YYYY-MM-DDTHH:mm:ssZ");
        var endTS = moment(data.sprintinfo.end, "YYYY-MM-DDTHH:mm:ssZ");
        var chartTS = startTS;
        var issueCount = data.sprintinfo.total_issues;

        var chartData = {
            series: ["Issues"],
            data: []
        };

        var sprintDuration = endTS.diff(startTS, "days") + 1;
        var closedIssues = _.pluck(data.issues, "closed_at");
        closedIssues = _.compact(closedIssues);
        closedIssues = _.map(closedIssues, function(i) {
            return moment(i, "YYYY-MM-DDTHH:mm:ssZ")
        })

        for (var i =0; i <= sprintDuration; i++) {
            if (issueCount == 0) {
                // if no more issues, just push 0
                chartData.data.push({
                    x: chartTS.format("DD-MMM"),
                    y: [0]
                });
            }
            else {

                var todaysIssues = _.filter(closedIssues, function(i) {
                    return i.isSame(chartTS, "year") && i.isSame(chartTS, "month") && i.isSame(chartTS, "day");
                });

                issueCount -= todaysIssues.length;
                chartData.data.push({
                    x: chartTS.format("DD-MMM"),
                    y: [issueCount]
                });

            }

            chartTS.add(1, "days");
        }

        return chartData;
    }


    //Get the retrospective information given a sprint
    $scope.fetchSprint = function(id) {
        $http({
            method: "GET",
            url: "/burndown/" + projectOwner + "/" + projectName,
            params: {
                sprintid: id
            }
        }).success(function(data, status, headers, config) {
            $scope.selectedSprint = data;

            _.assign($scope.selectedSprint, {
                "slideUrl": "/" + projectOwner + "/" + projectName + "/slides?sprintid=" + id
            });

            $scope.chart.data = buildChartData($scope.selectedSprint);

            $scope.sprintSelected = true;
            $scope.$apply();

        });
    };

    $scope.goBack = function() {
        $scope.selectedSprint = {};
        $scope.sprintSelected = false;
        $scope.chartData = {};
        console.log($scope.chartData);
    }

}]);
