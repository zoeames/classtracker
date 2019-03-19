import React from 'react';
import './Tracker.scss';

class Tracker extends React.Component {

//   this.assignments = [];
//   this.uid = this.authService.getCurrentUid();
//   this.students = [];
//   this.assignments = [];
//   this.tempAssignments = [];
// }

// $onInit() {
//   this.getAssignmentList();
// }

// getAssignmentList() {
//   this.assignmentService
//     .getGithubAssignmentList()
//     .then(fbAssignments => {
//       this.tempAssignments = fbAssignments.sort(
//         (a, b) => a.assignedNumber - b.assignedNumber
//       );
//       for (let x = 0; x < this.tempAssignments.length; x++) {
//         let newAssignment = {
//           details: this.tempAssignments[x],
//           studentStats: []
//         };
//         this.assignments.push(newAssignment);
//       }
//       this.getStudentList();
//     })
//     .catch(err => {
//       console.error("error in assignments", err);
//     });
// }

// getStudentList() {
//   let studentPromises = [];
//   this.studentService
//     .getStudentList()
//     .then(fbStudents => {
//       const filteredAry = fbStudents.filter(e => e.isStudent);
//       this.students = filteredAry.sort(function(a, b) {
//         return a.lastName == b.lastName
//           ? 0
//           : +(a.lastName > b.lastName) || -1;
//       });
//       for (let j = 0; j < this.students.length; j++) {
//         studentPromises.push(this.getAllTheStudentStuff(this.students[j]));
//       }

//       this.$q.all(studentPromises).then(data => {
//         for (let b = 0; b < data.length; b++) {
//           var newAssignments = this.submitAssignmentService.smashLists(
//             this.tempAssignments,
//             data[b].assignments
//           );
//           this.megaSmash(newAssignments);
//         }
//       });
//     })
//     .catch(err => {
//       console.error("error in students", err);
//     });
// }

// getAllTheStudentStuff(student) {
//   return this.$q((resolve, reject) => {
//     this.submitAssignmentService
//       .getSubmitAssignmentsByUid(student.uid)
//       .then(myAssignments => {
//         student.assignments = myAssignments;
//         resolve(student);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }

// getStatus(status) {
//   switch (status) {
//     case "inProgress":
//       return "P";
//       break;
//     case "excused":
//       return "E";
//       break;
//     case "done":
//       return "D";
//       break;
//     default:
//       return "X";
//       break;
//   }
// }

// megaSmash(studentAssignments) {
//   for (let y = 0; y < this.assignments.length; y++) {
//     const assignment = this.assignments[y];
//     const status = this.getStatus(studentAssignments[y].status);
//     assignment.studentStats.push(status);
//   }
// }








  render() {
    return (
      <div className="Tracker">
        <div class="main-container ">
          <h1>Assignment Tracker</h1>
          <table class="table table-hover" id="tracker-table">
            <thead>
              <tr>
                <th>Assignments</th>
                <th class="rotate" ng-repeat="student in $ctrl.students">
                  <div>
                    <a>
                      {/* ui-sref="student_progress({id: student.uid})" */}
                      <span>{{student.firstName}} {{student.lastName}}</span>
                    </a>
                  </div>
                </th>
                <th class="text-right">Assignments</th>
              </tr>
            </thead>
            <tbody>
              <tr ng-repeat="assignment in $ctrl.assignments">
                <td class='text-nowrap'>
                  <a ng-href="{{assignment.details.URL}}" target="_blank" rel="noopener noreferrer">{{assignment.details.title}}</a>
                </td>
                <td ng-repeat="stat in assignment.studentStats track by $index" ng-class='{"success": stat === "D", "warning": stat === "P" , "danger": stat === "X", "royal": stat === "E"}'>{{stat}}</td>
                <td class='text-nowrap'>
                  <a ng-href="{{assignment.details.URL}}" target="_blank" rel="noopener noreferrer">{{assignment.details.title}}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Tracker;
