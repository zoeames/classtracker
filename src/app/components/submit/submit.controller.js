class SubmitController {
  constructor(authService, assignmentService, submitAssignmentService) {
    "ngInject";

    this.assignmentService = assignmentService;
    this.submitAssignmentService = submitAssignmentService;
    this.authService = authService;
    this.assignments = [];
  }

  $onInit() {
    this.getGithubAssignments();
  }

  getGithubAssignments() {
    this.assignmentService.getGithubAssignmentList().then(fbAssignments => {
      fbAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      this.assignments = fbAssignments;
    });
  }

  startAssignment(assignment) {
    let newSumitAssignment = {
      assignmentId: assignment.assignmentId,
      uid: this.authService.getCurrentUid(),
      githubUrl: "",
      status: "inProgress"
    };

    this.submitAssignmentService
      .postNewAssignment(newSumitAssignment)
      .then(result => {
        this.getGithubAssignments();
      })
      .catch(err => {
        console.log("err", err);
      });
  }
}

export default SubmitController;
