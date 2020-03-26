import React from 'react';

import BadStudent from '../BadStudent/BadStudent';

import './BadStudentTable.scss';

class BadStudentTable extends React.Component {
  render() {
    const { students } = this.props;

    const studentRows = students.map(student => <BadStudent key={student.id} student={student} />);
    return (
      <div className="BadStudentTable col-xs-12">
        {students.length > 0 ? (
          <table className="table table-striped table-hover border border-primary">
            <thead>
              <tr className="bg-primary">
                <th className="text-center">Name</th>
                <th className="text-center">Links</th>
                <th className="text-center">Treehouse Status</th>
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
