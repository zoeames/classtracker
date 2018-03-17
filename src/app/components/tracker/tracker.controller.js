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
    this.getAssignmentList();
  }

  getAssignmentList() {
    this.assignmentService
      .getGithubAssignmentList()
      .then(fbAssignments => {
        this.tempAssignments = fbAssignments.sort(
          (a, b) => a.assignedNumber - b.assignedNumber
        );
        for (let x = 0; x < this.tempAssignments.length; x++) {
          let newAssignment = {
            details: this.tempAssignments[x],
            studentStats: []
          };
          this.assignments.push(newAssignment);
        }
        this.getStudentList();
      })
      .catch(err => {
        console.error("error in assignments", err);
      });
  }

  getStudentList() {
    this.studentService
      .getStudentList()
      .then(fbStudents => {
        const filteredAry = fbStudents.filter(e => e.isStudent);
        this.students = filteredAry.sort(function(a, b) {
          return a.lastName == b.lastName
            ? 0
            : +(a.lastName > b.lastName) || -1;
        });
        for (let j = 0; j < this.students.length; j++) {
          this.getAllTheStudentStuff(this.students[j]);
        }
      })
      .catch(err => {
        console.error("error in students", err);
      });
  }

  getAllTheStudentStuff(student) {
    this.submitAssignmentService
      .getSubmitAssignmentsByUid(student.uid)
      .then(myAssignments => {
        student.assignments = this.submitAssignmentService.smashLists(
          this.tempAssignments,
          myAssignments
        );
        this.megaSmash(student);
      })
      .catch(err => {
        console.error("error in getAllTheStudentStuff", err);
      });
  }

  getStatus(status) {
    switch (status) {
      case "inProgress":
        return "P";
        break;
      case "excused":
        return "E";
        break;
      case "done":
        return "D";
        break;
      default:
        return "X";
        break;
    }
  }

  megaSmash(studentStuff) {
    for (let y = 0; y < this.assignments.length; y++) {
      const assignment = this.assignments[y];
      const status = this.getStatus(studentStuff.assignments[y].status);
      assignment.studentStats.push(status);
    }
  }
}

export default TrackerController;
