app.controller("PathfinderCtrl", function($scope, StudentFactory){
	$scope.students = [];

	StudentFactory.getStudentList().then(function(fbStudents){
		$scope.students = fbStudents;
	});
});