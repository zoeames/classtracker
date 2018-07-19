class AssignmentsController {
  constructor(assignmentService) {
    'ngInject';

    this.assignmentService = assignmentService;
    this.assignments = [];
  }

  $onInit() {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentService.getAssignmentList().then((fbAssignments) => {
      fbAssignments.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
      this.assignments = fbAssignments;
    });
  }
}

export default AssignmentsController;