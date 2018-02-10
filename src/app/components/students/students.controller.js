class StudentsController {
  constructor(studentService) {
    'ngInject';

    this.studentService = studentService;
    this.students = [];
  }

  $onInit() {
    this.getStudentList();
  }

  getStudentList() {
    this.studentService.getStudentList().then((fbStudents) => {
      fbStudents.forEach((student) => {
        if (student.treehouseComplete === true) {
          student.treehousePoints = 'done';
        } else if (student.treehouse === '') {
          student.treehousePoints = '????';
        } else {
          this.studentService.getTreehouseProfilePoints(student.treehouse).then((treehouse) => {
            student.treehousePoints = treehouse;
          });
        }
      });
      this.students = fbStudents;
    }).catch((err) => {
      console.error('error in students', err);
    });
  }
}

export default StudentsController;