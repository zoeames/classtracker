app.controller("AssignmentCtrl", function($scope, AssignmentService){
	$scope.assignments = [];
	
	AssignmentService.getAssignmentList().then(function(fbAssignments){
		fbAssignments.sort(function(a,b){ 
  		return new Date(b.dueDate) - new Date(a.dueDate);
		});
		$scope.assignments = fbAssignments;
	});
});