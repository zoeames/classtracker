class SubmitController {
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
      })
    });
  }

  startAssignment(assignment) {
    let newSumitAssignment = {
      assignmentId: assignment.assignmentId,
      uid: this.authService.getCurrentUid(),
      githubUrl: "",
      status: "inProgress"
    };

    this.submitAssignmentService.postNewAssignment(newSumitAssignment)
      .then(result => {
        this.getGithubAssignments();
      })
      .catch(err => {
        console.log("err", err);
      });
  }



  completeAssignment(assignment) {
    this.submitAssignmentService.completeAssignment(assignment)
      .then(result => {
        this.getGithubAssignments();
      })
      .catch(err => {
        console.log("err", err);
      });
  }


  updateGithub(assignment){
    this.submitAssignmentService.updateGithub(assignment)
    .then(result => {
      this.getGithubAssignments();
    })
    .catch(err => {
      console.log("err", err);
    });
  }

  acceptExcused(assignment){
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

export default SubmitController;
