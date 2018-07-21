import React from 'react';

import studentRequests from '../../firebaseRequests/students';

import GoodStudent from '../../components/GoodStudent/GoodStudent';
import BadStudentTable from '../../components/BadStudentTable/BadStudentTable';

import './Students.css';
class Students extends React.Component {
  state = {
    badStudents: [],
    goodStudents: [],
  }

  componentDidMount() {
    studentRequests
      .getRequest()
      .then(fbStudents => {
        const tempGoodStudents = [];
        const tempBadStudents = [];
        fbStudents.forEach(student => {
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
      <BadStudentTable students={this.state.badStudents}/>
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
