import React from 'react';

import studentRequests from '../../firebaseRequests/students';

import GoodStudent from '../../components/GoodStudent/GoodStudent';
import BadStudents from '../../components/BadStudents/BadStudents';

import './Students.css';
class Students extends React.Component {
  state = {
    students: [],
    badStudents: [],
    goodStudents: [],
  }

  componentDidMount() {
    studentRequests
      .getRequest()
      .then(fbStudents => {
        fbStudents.forEach(student => {
          if (student.treehouseComplete === true) {
            student.treehousePoints = 'done';
          } else if (student.treehouse === '') {
            student.treehousePoints = '????';
          } else {
            studentRequests
              .getTreehouseProfilePoints(student.treehouse)
              .then(treehouse => {
                student.treehousePoints = treehouse;
              });
          }
        });
        this.setState({ students: fbStudents });
        const tempGoodStudents = [];
        const tempBadStudents = [];
        this.state.students.forEach(student => {
          if (student.treehouseComplete && student.isStudent) {
            tempGoodStudents.push(student);
          } else if (!student.treehouseComplete && student.isStudent) {
            tempBadStudents.push(student);
          }
        });
        this.setState({badStudents: tempBadStudents, goodStudents: tempGoodStudents});
      })
      .catch(err => {
        console.error('error with get students request', err);
      });
  }

  render() {
    const badStudentComponents = (
      <BadStudents students={this.state.badStudents}/>
    );
    const goodStudentComponents = this.state.goodStudents.map((student) => {
      return (
        <GoodStudent
          key={student.id}
          student={student}
        />
      );
    });
    return (
      <div className="Students">
        <div className="main-container">
          <h1>Students</h1>
          <h3>E8 Students</h3>
          {badStudentComponents}
          <h3>E7 Students</h3>
          {goodStudentComponents}
        </div>
      </div>
    );
  }
}

export default Students;
