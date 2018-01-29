app.controller("StudentCtrl", function($scope, StudentService){
	$scope.students = [];

	StudentService.getStudentList().then(function(fbStudents){
		$scope.students = fbStudents;
	});
});