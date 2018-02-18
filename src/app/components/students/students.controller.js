class StudentsController {
  constructor(studentService) {
    "ngInject";

    this.studentService = studentService;
    this.students = [];
    this.badStudents = [];
    this.goodStudents = [];
    this.instructors = [];
  }

  $onInit() {
    this.getStudentList();
  }

  getStudentList() {
    this.studentService
      .getStudentList()
      .then(fbStudents => {
        fbStudents.forEach(student => {
          if (student.treehouseComplete === true) {
            student.treehousePoints = "done";
          } else if (student.treehouse === "") {
            student.treehousePoints = "????";
          } else {
            this.studentService
              .getTreehouseProfilePoints(student.treehouse)
              .then(treehouse => {
                student.treehousePoints = treehouse;
              });
          }
        });
        this.students = fbStudents;
        this.students.forEach(student => {
          if (student.treehouseComplete && student.isStudent) {
            this.goodStudents.push(student);
          } else if (!student.isStudent) {
            this.instructors.push(student);
          } else {
            this.badStudents.push(student);
          }
        });
      })
      .catch(err => {
        console.error("error in students", err);
      });
  }
}

export default StudentsController;
