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
    this.tempAssignments = [];
  }

  $onInit() {
    this.getStudentList();
  }

  getStudentList() {
    this.studentService
      .getStudentList()
      .then(fbStudents => {
        this.students = fbStudents.sort(function(a, b) {
          return a.lastName == b.lastName
            ? 0
            : +(a.lastName > b.lastName) || -1;
        });
        this.getAssignmentList();
      })
      .catch(err => {
        console.error("error in students", err);
      });
  }

  getAssignmentList() {
    this.assignmentService
      .getGithubAssignmentList()
      .then(fbAssignments => {
        this.tempAssignments = fbAssignments;
        this.megaSmash();
      })
      .catch(err => {
        console.error("error in assignments", err);
      });
  }

  megaSmash() {
    console.log("tempAssignments", this.tempAssignments);
    console.log("students", this.students);
    this.tempAssignments.forEach((tempAssignment) => {
      let newAssignment = {details: tempAssignment, students: []}
      for(let i=0; i < this.students.length; i++){
        const student = {status: "X"}
        newAssignment.students.push(student);
      }
      this.assignments.push(newAssignment);
    });
  }
}

export default TrackerController;
