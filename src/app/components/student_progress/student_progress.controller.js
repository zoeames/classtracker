class StudentProgressController {
  constructor(
    $stateParams,
    assignmentService,
    studentService,
    submitAssignmentService
  ) {
    "ngInject";

    this.$stateParams = $stateParams;

    this.assignmentService = assignmentService;
    this.studentService = studentService;
    this.submitAssignmentService = submitAssignmentService;
    this.assignments = [];
    this.studentId = "";
    this.student = {};
  }

  $onInit() {
    this.studentId = this.$stateParams.id;
    this.getStudent(this.studentId);
    this.getGithubAssignments();
  }

  getStudent(uid) {
    this.studentService
      .getSingleStudent(uid)
      .then(fbStudent => {
        this.student = fbStudent;
      })
      .catch(err => {
        console.error("error in get single student", err);
      });
  }

  getGithubAssignments() {
    this.assignmentService.getGithubAssignmentList().then(fbAssignments => {
      this.submitAssignmentService
        .getSubmitAssignmentsByUid(this.studentId)
        .then(myAssignments => {
          let combinedAssignments = this.submitAssignmentService.smashLists(
            fbAssignments,
            myAssignments
          );
          combinedAssignments.sort(
            (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
          );
          this.assignments = combinedAssignments;

          console.log("this.assignments", this.assignments);
        });
    });
  }
}

export default StudentProgressController;
