class TrackerController {
  constructor(
    authService,
    assignmentService,
    studentService,
    submitAssignmentService
  ) {
    "ngInject";

    this.assignmentService = assignmentService;
    this.submitAssignmentService = submitAssignmentService;
    this.studentService = studentService;
    this.authService = authService;

    this.assignments = [];
    this.uid = this.authService.getCurrentUid();
    this.students = [];
    this.assignments = [];
  }

  $onInit() {
    this.getStudentList();
    this.getAssignmentList();
    
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

  getAssignmentList() {
    this.assignmentService
      .getGithubAssignmentList()
      .then(fbAssignments => {
        this.assignments = fbAssignments;
        console.log("assignments", this.assignments);
      })
      .catch(err => {
        console.error("error in assignments", err);
      });
  }
}

export default TrackerController;
