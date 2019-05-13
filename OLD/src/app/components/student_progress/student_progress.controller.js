class StudentProgressController {


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
