import React from 'react';

import studentRequests from '../../../helpers/data/studentRequests';

import GoodStudent from '../../components/GoodStudent/GoodStudent';
import BadStudentTable from '../../components/BadStudentTable/BadStudentTable';

import './Students.scss';

class Students extends React.Component {
  state = {
    badStudents: [],
    goodStudents: [],
  }

  componentDidMount() {
    studentRequests
      .getRequest()
      .then((fbStudents) => {
        const tempGoodStudents = [];
        const tempBadStudents = [];
        fbStudents.forEach((student) => {
          if (student.preworkComplete && student.isStudent) {
            tempGoodStudents.push(student);
          } else if (!student.preworkComplete && student.isStudent) {
            tempBadStudents.push(student);
          }
        });
        tempGoodStudents.sort((a, b) => {
          if (a.firstName < b.firstName) return -1;
          if (a.firstName > b.firstName) return 1;
          return 0;
        });

        tempBadStudents.sort((a, b) => {
          if (a.firstName < b.firstName) return -1;
          if (a.firstName > b.firstName) return 1;
          return 0;
        });

        this.setState({ badStudents: tempBadStudents, goodStudents: tempGoodStudents });
      })
      .catch(err => console.error('error with get students request', err));
  }

  render() {
    const badStudentComponents = (
      <BadStudentTable students={this.state.badStudents}/>
    );
    const goodStudentComponents = this.state.goodStudents.map(student => <GoodStudent key={student.id} student={student} />);
    return (
      <div className="Students">
        <h1>Students</h1>
        {badStudentComponents}
        <div className="d-flex flex-wrap">
          {goodStudentComponents}
        </div>
      </div>
    );
  }
}

export default Students;
