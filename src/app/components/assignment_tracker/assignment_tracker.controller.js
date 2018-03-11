class AssignmentTrackerController {
  constructor(authService, assignmentService, submitAssignmentService) {
    "ngInject";

    this.assignmentService = assignmentService;
    this.submitAssignmentService = submitAssignmentService;
    this.authService = authService;
    this.assignments = [];
    this.uid = this.authService.getCurrentUid();
  }

  $onInit() {
    this.getGithubAssignments();
  }

  getGithubAssignments() {
    this.assignmentService.getGithubAssignmentList().then(fbAssignments => {
      
      this.submitAssignmentService.getSubmitAssignmentsByUid(this.uid).then((myAssignments) =>{
        let combinedAssignments = this.submitAssignmentService.smashLists(fbAssignments, myAssignments);
        combinedAssignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        this.assignments = combinedAssignments;
        console.log("assignments", this.assignments)
      })
    });
  }
}

export default AssignmentTrackerController;
