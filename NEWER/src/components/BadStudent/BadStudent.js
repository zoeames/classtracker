import React from 'react';

import studentRequests from '../../firebaseRequests/students';

import './BadStudent.scss';

class BadStudentTable extends React.Component {
  state = {
    student: {},
    treehousePoints: '',
  }

  componentDidMount() {
    const { student } = this.props;
    if (student.treehouse.length > 0) {
      studentRequests
        .getTreehouseProfilePoints(student.treehouse)
        .then((treehouse) => {
          if (treehouse > 3000) {
            treehouse = 'done';
          }
          this.setState({ student, treehousePoints: treehouse });
        })
        .catch((err) => {
          console.error('error with get treehouse points request', err);
        });
    } else {
      this.setState({ student, treehousePoints: 'missing' });
    }
  }

  render() {
    const { student } = this.state;
    const treehouseImage = require('./img/treehouse.png');
    const points = this.state.treehousePoints;
    const githubLink = `https://github.com/${student.githubUsername}`;
    return (
      <tr className="BadStudent">
        <td className="col-xs-3">
          {student.firstName} {student.lastName}
        </td>
        <td className="col-xs-4">
          <a
            className="logo"
            href={student.treehouse}
            target="_blank" rel="noopener noreferrer"
          >
            <img
              className="treehouse-img"
              src={treehouseImage}
              alt="treehouse logo"
            />
          </a>
          <a className="logo" href={githubLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github fa-2x" />
          </a>
          <a className="logo website-link" href={student.biosite} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-address-book fa-2x" />
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
