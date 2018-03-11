class TrackerController {
  constructor(authService, assignmentService, studentService, submitAssignmentService) {
    "ngInject";

    this.assignmentService = assignmentService;
    this.submitAssignmentService = submitAssignmentService;
    this.studentService = studentService;
    this.authService = authService;
    
    this.assignments = [];
    this.uid = this.authService.getCurrentUid();
    this.students = [];
  }

  $onInit() {
    this.getStudentList();
  }
  
  getStudentList() {
    this.studentService
      .getStudentList()
      .then(fbStudents => {
        this.students = fbStudents;
        console.log("students", this.students);
      })
      .catch(err => {
        console.error("error in students", err);
      });
  }
}

export default TrackerController;
