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

        Promise.all(studentPromises).then((data) => {
          const finalAssignmentList = [...this.state.assignments];
          finalAssignmentList.forEach((a) => {
            const { assignmentId } = a.details;
            data.forEach((d) => {
              const studentAssignment = d.assignments.find(x => x.assignmentId === assignmentId);
              if (!studentAssignment) {
                a.studentStats.push(this.getStatus('backlog'));
              } else {
                a.studentStats.push(this.getStatus(studentAssignment.status));
              }
            });
          });
          this.setState({ assignments: finalAssignmentList });
        });
      })
      .catch(err => console.error('error in students', err));
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
        return 'D';
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
    const addClass = (status) => {
      switch (status) {
        case 'D':
          return 'table-success';
        case 'P':
          return 'table-warning';
        case 'E':
          return 'table-royal';
        default:
          return 'table-danger';
      }
    };

    const createTH = this.state.students.map(student => (
      <th className="rotate" key={student.id}>
        <div>
          <a href={`/student/${student.id}`}> {/* ui-sref="student_progress({id: student.uid})" */}
            <span>{student.firstName} {student.lastName}</span>
          </a>
        </div>
      </th>
    ));

    const createAssignmentTD = assignmentRow => assignmentRow.map((a, index) => <td key={ `student-assignment-${Math.floor(Math.random() * 6000) + 1}`} className={addClass(a)}>{a}</td>);

    const createTR = this.state.assignments.map(assignment => (
      <tr key={`row-label-${assignment.details.assignmentId}`}>
        <td className='text-nowrap'>
          <a href={assignment.details.URL} target="_blank" rel="noopener noreferrer">{assignment.details.title}</a>
        </td>
        {createAssignmentTD(assignment.studentStats)}
        <td className='text-nowrap'>
          <a href={assignment.details.URL} target="_blank" rel="noopener noreferrer">{assignment.details.title}</a>
        </td>
      </tr>
    ));

    return (
      <div className="Tracker">
        <h1>Assignment Tracker</h1>
        <div className="overflow-auto">
          <table className="table table-hover" id="tracker-table">
            <thead className="thead-dark">
              <tr>
                <th>Assignments</th>
                  {createTH}
                <th className="text-right">Assignments</th>
              </tr>
            </thead>
            <tbody>
              {createTR}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Tracker;
