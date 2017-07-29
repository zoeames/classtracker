'use strict';

app.controller("AssignmentCtrl", function($scope, AssignmentFactory){
	$scope.assignments = [];
	$scope.thisMonday = {};
	$scope.thisTuesday = {};
	$scope.thisStudygroup = {};
	$scope.thisSaturday = {};
	$scope.nextMonday = {};
	$scope.nextTuesday = {};
	$scope.nextStudygroup = {};
	$scope.nextSaturday = {};
	
	AssignmentFactory.getAssignmentList().then(function(fbAssignments){
		fbAssignments.sort(function(a,b){ 
  		return new Date(b.dueDate) - new Date(a.dueDate);
		});
		$scope.assignments = fbAssignments;
	})

	AssignmentFactory.getThisWeek().then(function(planz){
		planz.forEach((plan) => {
			switch (plan.id) {
			  case 'monday':
			    $scope.thisMonday = plan;
			  	break;
			  case 'saturday':
			    $scope.thisSaturday = plan;
			  	break;
			  case 'studygroup':
			    $scope.thisStudygroup = plan;
			  	break;
			  case 'tuesday':
			    $scope.thisTuesday = plan;
			    break;
			};
		});
	});

	AssignmentFactory.getNextWeek().then(function(planz){
		planz.forEach((plan) => {
			switch (plan.id) {
			  case 'monday':
			    $scope.nextMonday = plan;
			  	break;
			  case 'saturday':
			    $scope.nextSaturday = plan;
			  	break;
			  case 'studygroup':
			    $scope.nextStudygroup = plan;
			  	break;
			  case 'tuesday':
			    $scope.nextTuesday = plan;
			    break;
			};
		});
	});

	$scope.objectToArray= function(arr) {  
    return $filter('objectToArray')($filter('map')(arr, 'id'));
  }
});