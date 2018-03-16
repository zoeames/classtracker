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

    this.completedAssignmentNum = 0;
    this.progressAssignmentNum = 0;
    this.freshAssignmentNum = 0;
    this.excusedAssignmentNum = 0;
  }

  $onInit() {
    this.studentId = this.$stateParams.id;
    this.getStudent(this.studentId);
    this.getGithubAssignments();
  }

  assignmentTotals() {
    this.assignments.forEach(a => {
      switch (a.status) {
        case "done":
          this.completedAssignmentNum++;
          break;
        case "inProgress":
          this.progressAssignmentNum++;
          break;
        case "backlog":
          this.freshAssignmentNum++;
          break;
        case "excused":
          this.excusedAssignmentNum++;
          break;
      }
    });
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
          this.assignmentTotals();
        });
    });
  }

  excuseAssignment(assignment) {
    this.submitAssignmentService
      .excuseAssignment(assignment.submitAssignmentId)
      .then(result => {
        this.getGithubAssignments();
      })
      .catch(err => {
        console.error("err", err);
      });
  }

  resetAssignment(assignment) {
    this.submitAssignmentService
      .resetAssignment(assignment.submitAssignmentId)
      .then(result => {
        this.getGithubAssignments();
      })
      .catch(err => {
        console.error("err", err);
      });
  }
}

export default StudentProgressController;
