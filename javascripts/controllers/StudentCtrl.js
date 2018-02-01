app.controller("StudentCtrl", function ($scope, StudentService) {
	$scope.students = [];

	StudentService.getStudentList().then(function (fbStudents) {
		fbStudents.forEach(function (student) {
			if (student.treehouseComplete === true) {
				student.treehousePoints = 'done';
			} else {
				StudentService.getTreehouseProfilePoints(student.treehouse).then(function (treehouse) {
					student.treehousePoints = treehouse;
				});
			}
		});
		$scope.students = fbStudents;
	}).catch(function (err) {
		console.error("error in students", err);
	});

	$scope.getLastName = function(user) {
    var name =  user.name.split(' ');
    return name.slice(-1)[0];
}
});