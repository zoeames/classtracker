class StudentProgressController {

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
