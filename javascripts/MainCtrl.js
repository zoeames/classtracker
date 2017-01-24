'use strict';

app.controller("MainCtrl", function($scope, MainFactory){
	$scope.assignments = [];
	MainFactory.getAssignmentList().then(function(fbAssignments){
		fbAssignments.sort(function(a,b){ 
  		return new Date(a.dueDate) - new Date(b.dueDate);
		});
		$scope.assignments = fbAssignments;
	})

	$scope.objectToArray= function(arr) {  
    return $filter('objectToArray')($filter('map')(arr, 'id'));
  }
});