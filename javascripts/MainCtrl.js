'use strict';

app.controller("MainCtrl", function($scope, MainFactory){
	$scope.assignments = [];
	MainFactory.getAssignmentList().then(function(fbAssignments){
		fbAssignments.sort(function(a,b){ 
  		return new Date(b.dueDate) - new Date(a.dueDate);
		});
		$scope.assignments = fbAssignments;
	})

	MainFactory.getThisWeek().then(function(planz){
		console.log("thisWeek ", planz);
	});

	MainFactory.getNextWeek().then(function(planz){
		console.log("nextWeek ", planz);
	});

	$scope.objectToArray= function(arr) {  
    return $filter('objectToArray')($filter('map')(arr, 'id'));
  }
});