import React from 'react';

import BadStudent from '../BadStudent/BadStudent';

import './BadStudentTable.css';

class BadStudentTable extends React.Component {
  render() {
    const { students } = this.props;

    const studentRows = students.map(student => {
      return <BadStudent key={student.id} student={student} />;
    });
    return (
      <div className="BadStudentTable col-xs-12">
        {students.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr className="bg-primary">
                <th className="text-center">Name</th>
                <th className="text-center">Links</th>
                <th className="text-center">Treehouse Points</th>
              </tr>
            </thead>
            <tbody>{studentRows}</tbody>
          </table>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default BadStudentTable;
