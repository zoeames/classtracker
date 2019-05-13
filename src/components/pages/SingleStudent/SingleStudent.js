import React from 'react';
import moment from 'moment';

import treehouseLogo from './treehouse.png';
import './SingleStudent.scss';

import assignmentRequests from '../../../helpers/data/assignmentRequests';
import studentRequests from '../../../helpers/data/studentRequests';
import submitAssignmentRequests from '../../../helpers/data/submitAssignmentRequests';

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
        this.getGithubAssignments(fbStudent.uid);
        this.setState({ student: fbStudent });
      })
      .catch(err => console.error('error in get single student', err));
  }

  assignmentTotals() {
    const tempTotals = { ...this.state };
    this.state.assignments.forEach((a) => {
      switch (a.status) {
        case 'done':
          tempTotals.completedAssignmentNum += 1;
          break;
        case 'inProgress':
          tempTotals.progressAssignmentNum += 1;
          break;
        case 'backlog':
          tempTotals.freshAssignmentNum += 1;
          break;
        case 'excused':
          tempTotals.excusedAssignmentNum += 1;
          break;
        default:
          break;
      }
    });
    this.setState({
      completedAssignmentNum: tempTotals.completedAssignmentNum,
      progressAssignmentNum: tempTotals.progressAssignmentNum,
      freshAssignmentNum: tempTotals.freshAssignmentNum,
      excusedAssignmentNum: tempTotals.excusedAssignmentNum,
    });
  }

  getGithubAssignments(uid) {
    assignmentRequests.getGithubAssignmentList().then((fbAssignments) => {
      submitAssignmentRequests.getSubmitAssignmentsByUid(uid)
        .then((myAssignments) => {
          const combinedAssignments = submitAssignmentRequests.smashLists(
            fbAssignments,
            myAssignments,
          );
          combinedAssignments.sort(
            (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
          );
          this.setState({ assignments: combinedAssignments });
          this.assignmentTotals();
        });
    });
  }

  componentDidMount() {
    const studentId = this.props.match.params.id;
    this.getStudent(studentId);
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

    const assignmentClass = (status) => {
      let className = '';
      switch (status) {
        case 'done':
          className = 'bg-success';
          break;
        case 'inProgress':
          className = 'bg-warning';
          break;
        case 'backlog':
          className = 'bg-danger';
          break;
        case 'excused':
          className = 'bg-royal';
          break;
        default:
          break;
      }
      return className;
    };

    // excuseAssignment(assignment) {
    //   this.submitAssignmentService
    //     .excuseAssignment(assignment.submitAssignmentId)
    //     .then(result => {
    //       this.getGithubAssignments();
    //     })
    //     .catch(err => {
    //       console.error("err", err);
    //     });
    // }

    // resetAssignment(assignment) {
    //   this.submitAssignmentService
    //     .resetAssignment(assignment.submitAssignmentId)
    //     .then(result => {
    //       this.getGithubAssignments();
    //     })
    //     .catch(err => {
    //       console.error("err", err);
    //     });
    // }


    const studentAssignmentRows = assignments.map(a => (
      <tr key={a.assignmentId} className={assignmentClass(a.status)}>
        <th scope="row" className='text-nowrap'>
          <a href={a.URL} target="_blank" rel="noopener noreferrer">{a.title}</a>
        </th>
        <th scope="row">{moment(a.dueDate).format('LL')}</th>
        <th scope="row">{a.status}</th>
        <th scope="row">{a.submissionDate ? moment(a.submissionDate).format('LLL') : ''}</th>
        <th scope="row" className="text-center">
          {a.githubUrl ? <a target="_blank" rel="noopener noreferrer" href={a.githubUrl}><i className="fab fa-github fa-lg"></i></a> : ''}
        </th>
        <th scope="row">
          {(!(a.status === 'done') && !(a.status === 'excused')) ? <button className="btn btn-default" ng-click="excuseAssignment(a)"><i className="fas fa-pause"></i></button> : ''}
        </th>
        <th scope="row">
          { a.status === 'done' ? <button className="btn btn-danger" ng-click="resetAssignment(a)"><i className="fas fa-undo"></i></button> : ''}
        </th>
      </tr>
    ));

    return (
      <div className="SingleStudent">
        <div className="row">
          <div className="jumbotron col">
            <div className="row">
              <div className="col-9">
                <h1>Student: {student.firstName} {student.lastName}</h1>
              </div>
              <div className="col-3">
                <div class="row">
                  <div className="col-4">
                    <a className="treehouse-link" href={student.treehouse} target="_blank" rel="noopener noreferrer">
                      <img className="treehouse-img" src={treehouseLogo} alt="treehouse logo" />
                    </a>
                  </div>
                  <div className="col-4">
                    <a className="github-link" href={`https://github.com/${student.githubUsername}`} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github fa-2x"></i>
                    </a>
                  </div>
                  <div className="col-4">
                    <a className="website-link" href={student.biosite} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-address-book fa-2x"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
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
            <tbody>
              { studentAssignmentRows }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SingleStudent;
