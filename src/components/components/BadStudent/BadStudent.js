import React from 'react';

import treehouseRequests from '../../../helpers/data/treehouseRequests';

import './BadStudent.scss';

import treehouseImage from './img/treehouse.png';

class BadStudentTable extends React.Component {
  state = {
    student: {},
    treehousePoints: '',
  }

  componentDidMount() {
    const { student } = this.props;
    this.setState({ student, treehousePoints: 'missing' });
  }

  render() {
    const { student } = this.state;
    const points = this.state.treehousePoints;
    const githubLink = `https://github.com/${student.githubUsername}`;
    return (
      <tr className="BadStudent">
        <td className="col-xs-3">
          {student.firstName} {student.lastName}
        </td>
        <td className="col-xs-4">
          <a className="logo" href={githubLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github fa-2x" />
          </a>
        </td>
        <td
          className={`col-xs-5
            ${(points > 2900 && points < 3000) ? 'almost-points' : ''}
            ${points > 2000 && points < 2900 ? 'middle-points' : ''}
            ${points < 2000 ? 'danger-points' : ''}
            ${points === 'missing' ? 'danger-points' : ''}
          `}
        >
          {
            points === 'done'
              ? <i className="fa fa-check-square fa-2x treehouse-check" aria-hidden="true"></i>
              : <span>{points}</span>
          }
        </td>
      </tr>
    );
  }
}

export default BadStudentTable;
