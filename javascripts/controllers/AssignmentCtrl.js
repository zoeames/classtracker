app.controller("AssignmentCtrl", function($scope, AssignmentFactory){
	$scope.assignments = [];
	
	AssignmentFactory.getAssignmentList().then(function(fbAssignments){
		fbAssignments.sort(function(a,b){ 
  		return new Date(b.dueDate) - new Date(a.dueDate);
		});
		$scope.assignments = fbAssignments;
	});
});