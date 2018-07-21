import React from 'react';

import BadStudent from '../BadStudent/BadStudent';

import './BadStudentTable.css';

class BadStudentTable extends React.Component {
  render() {
    const { students } = this.props;

    const studentRows = students.map(student => {
      return (
        <BadStudent key={student.id} student={student} />
      );
    });
    return (
      <div className="BadStudentTable">
        <table className="table table-striped">
          <thead>
            <tr className="title-row">
              <th className="text-center">Name</th>
              <th className="text-center">Links</th>
              <th className="text-center">Treehouse Points</th>
            </tr>
          </thead>
          <tbody>
            {studentRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BadStudentTable;
