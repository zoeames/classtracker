import React from 'react';
import './Tracker.scss';

import assignmentRequests from '../../../helpers/data/assignmentRequests';
import studentRequests from '../../../helpers/data/studentRequests';
import submitAssignmentRequests from '../../../helpers/data/submitAssignmentRequests';

class Tracker extends React.Component {
  state = {
    students: [],
    assignments: [],
  }

  getStudentList() {
    const studentPromises = [];
    studentRequests.getRequest()
      .then((fbStudents) => {
        const filteredAry = fbStudents.filter(e => e.isStudent);
        const students = filteredAry.sort((a, b) => (a.lastName === b.lastName ? 0 : +(a.lastName > b.lastName) || -1));
        for (let j = 0; j < students.length; j += 1) {
          studentPromises.push(this.getAllTheStudentStuff(students[j]));
        }
        this.setState({ students });

        // console.log('studentPromises', studentPromises);
        Promise.all(studentPromises).then((data) => {
          // console.log('data', data);
          let finalSmash = [];
          for (let b = 0; b < data.length; b += 1) {
            const newAssignments = submitAssignmentRequests.smashLists(
              this.state.assignments,
              data[b].assignments,
            );
            // console.log('MEGA SMASH', this.megaSmash(newAssignments));
            finalSmash = this.megaSmash(newAssignments);
          }
          this.setState({ assignments: finalSmash });
        });
      })
      .catch(err => console.error('error in students', err));
  }


  megaSmash(studentAssignments) {
    const assignmentCopy = [...this.state.assignments];
    for (let y = 0; y < assignmentCopy.length; y += 1) {
      const status = this.getStatus(studentAssignments[y].status);
      assignmentCopy[y].studentStats.push(status);
    }
    return assignmentCopy;
  }

  getAllTheStudentStuff(student) {
    const tempStudent = { ...student };
    return new Promise((resolve, reject) => {
      submitAssignmentRequests.getSubmitAssignmentsByUid(tempStudent.uid)
        .then((myAssignments) => {
          tempStudent.assignments = myAssignments;
          resolve(tempStudent);
        })
        .catch(err => reject(err));
    });
  }

  getStatus(status) {
    switch (status) {
      case 'inProgress':
        return 'P';
      case 'excused':
        return 'E';
      case 'done':
        return 'E';
      default:
        return 'X';
    }
  }

  getAssignmentList = () => {
    assignmentRequests.getGithubAssignmentList()
      .then((fbAssignments) => {
        const assignments = [];
        const tempAssignments = fbAssignments.sort(
          (a, b) => a.assignedNumber - b.assignedNumber,
        );
        for (let x = 0; x < tempAssignments.length; x += 1) {
          const newAssignment = {
            details: tempAssignments[x],
            studentStats: [],
          };
          assignments.push(newAssignment);
        }
        this.setState({ assignments });
        this.getStudentList();
      })
      .catch(err => console.error('error in assignments', err));
  }

  componentDidMount() {
    this.getAssignmentList();
  }

  render() {
  // <th class="rotate" ng-repeat="student in $ctrl.students">
    // <div>
    //   <a>
  //       {/* ui-sref="student_progress({id: student.uid})" */}
  //       <span>{{student.firstName}} {{student.lastName}}</span>
  //     </a>
  //   </div>
  // </th>
    const createTH = this.state.students.map(student => (
      <th className="rotate" key={student.id}>
        <div>
          <a> {/* ui-sref="student_progress({id: student.uid})" */}
            <span>{student.firstName} {student.lastName}</span>
          </a>
        </div>
      </th>
    ));
    // const createTH = () => {


    //   return (
    //     <th class="rotate" ng-repeat="student in $ctrl.students">
    //       <div>
    //         <a>
    //           {/* ui-sref="student_progress({id: student.uid})" */}
    //           <span>{{student.firstName}} {{student.lastName}}</span>
    //         </a>
    //       </div>
    //     </th>
    //   );
    // };




  // <tr ng-repeat="assignment in $ctrl.assignments">
  //               <td class='text-nowrap'>
  //                 <a ng-href="{{assignment.details.URL}}" target="_blank" rel="noopener noreferrer">{{assignment.details.title}}</a>
  //               </td>
  //               <td ng-repeat="stat in assignment.studentStats track by $index" ng-class='{"success": stat === "D", "warning": stat === "P" , "danger": stat === "X", "royal": stat === "E"}'>{{stat}}</td>
  //               <td class='text-nowrap'>
  //                 <a ng-href="{{assignment.details.URL}}" target="_blank" rel="noopener noreferrer">{{assignment.details.title}}</a>
  //               </td>
  //             </tr>

    return (
      <div className="Tracker">
        <div className="main-container ">
          <h1>Assignment Tracker</h1>
          <table className="table table-hover" id="tracker-table">
            <thead>
              <tr>
                <th>Assignments</th>
                  {createTH}
                {/* <th className="text-right">Assignments</th> */}
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Tracker;
