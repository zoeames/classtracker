import React from 'react';

import BadStudent from '../BadStudent/BadStudent';

import './BadStudentTable.scss';

class BadStudentTable extends React.Component {
  state = {
    activeSort: 'lastName',
    sorts: {
      lastName: true,
      githubUsername: false,
      fccPercentage: false,
      caPercentage: false,
      replCount: false,
    },
  }


  onSortEvent(event, sortKey) {
    const { sortie } = this.props;

    Object.keys(this.state.sorts).forEach((key) => {
      if (key !== sortKey) {
        this.setState({ sorts: { [key]: false } });
      }
    });

    this.setState({ sorts: { [sortKey]: !this.state.sorts[sortKey] }, activeSort: sortKey });
    sortie(event, sortKey, this.state.sorts[sortKey]);
  }

  render() {
    const { students } = this.props;
    const { activeSort } = this.state;

    const studentRows = students.map(student => (
      <BadStudent key={student.id} student={student} />
    ));
    return (
      <div className="BadStudentTable col-xs-12">
        {students.length > 0 ? (
          <table className="table table-striped table-hover border border-primary">
            <thead>
              <tr className="bg-primary bad-student__header">
                <th onClick={e => this.onSortEvent(e, 'lastName')} className={`text-center ${(activeSort === 'lastName') ? 'selected' : ''}` }>Name</th>
                <th onClick={e => this.onSortEvent(e, 'githubUsername')} className={`text-center ${(activeSort === 'githubUsername') ? 'selected' : ''}` }>GitHub</th>
                <th onClick={e => this.onSortEvent(e, 'fccPercentage')} className={`text-center ${(activeSort === 'fccPercentage') ? 'selected' : ''}` }>FreeCodeCamp</th>
                <th onClick={e => this.onSortEvent(e, 'caPercentage')} className={`text-center ${(activeSort === 'caPercentage') ? 'selected' : ''}` }>CodeCademy</th>
                <th onClick={e => this.onSortEvent(e, 'replCount')} className={`text-center ${(activeSort === 'replCount') ? 'selected' : ''}` }>ReplIt</th>
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
