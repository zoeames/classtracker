'use strict';

app.controller("MainCtrl", function($scope, MainFactory){
	$scope.assignments = [];
	MainFactory.getAssignmentList().then(function(fbAssignments){
		$scope.assignments = fbAssignments;
	})
});