import React from 'react';
import './SingleStudent.scss';
import studentRequests from '../../../helpers/data/studentRequests';


class SingleStudent extends React.Component {
  state = {
    assignments: [],
    student: {},
    completedAssignmentNum: 0,
    progressAssignmentNum: 0,
    freshAssignmentNum: 0,
    excusedAssignmentNum: 0,
  };

  getStudent(id) {
    studentRequests
      .getSingleStudentById(id)
      .then((fbStudent) => {
        console.error('fbStudent', fbStudent);
        this.setState({ student: fbStudent });
      })
      .catch(err => console.error('error in get single student', err));
  }

  componentDidMount() {
    const studentId = this.props.match.params.id;
    console.error('id from single', studentId);
    // this.studentId = this.$stateParams.id;
    this.getStudent(studentId);
    // this.getGithubAssignments();
  }

  render() {
    const {
      student,
      completedAssignmentNum,
      assignments,
      excusedAssignmentNum,
      progressAssignmentNum,
      freshAssignmentNum,
    } = this.state;
    return (
      <div className="SingleStudent">
        <div className="row">
          <div className="jumbotron">
            <div className="row">
              <div className="col-xs-9">
                <h1>Student: {student.firstName} {student.lastName}</h1>
              </div>
              <div className="col-xs-3">
                <div className="col-xs-4">
                  <a className="treehouse-link" href="{student.treehouse}" target="_blank" rel="noopener noreferrer">
                    <img className="treehouse-img" src="./img/treehouse.png" alt="treehouse logo" />
                  </a>
                </div>
                <div className="col-xs-4">
                  <a className="github-link" href="{student.github}" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github fa-2x"></i>
                  </a>
                </div>
                <div className="col-xs-4">
                  <a className="website-link" href="{student.biosite}" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-address-book fa-2x"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="col-xs-4">
                Completed Assignments:
                <br/> {completedAssignmentNum} / {assignments.length - excusedAssignmentNum} = {(completedAssignmentNum / (assignments.length - excusedAssignmentNum) * 100).toFixed('0')}%
              </div>
              <div className="col-xs-4">
                In Progress Assignments:
                <br/> {progressAssignmentNum} / {assignments.length - excusedAssignmentNum} = {(progressAssignmentNum / (assignments.length - excusedAssignmentNum) * 100).toFixed('0')}%
              </div>
              <div className="col-xs-4">
                Un-started Assignments:
                <br/> {freshAssignmentNum} / {assignments.length - excusedAssignmentNum} = {(freshAssignmentNum / (assignments.length - excusedAssignmentNum) * 100).toFixed('0')}%
              </div>
            </div>

          </div>
        </div>
        <div className="row">
          <h3>Assignments:</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Due Date</th>
                <th scope="col">Status</th>
                <th scope="col">Date Submitted</th>
                <th scope="col">Github Repo</th>
                <th scope="col">Excuse</th>
                <th scope="col">Reset</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}

export default SingleStudent;
