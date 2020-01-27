import React from 'react';

import './BadStudent.scss';

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
          <a className="logo" href={githubLink} target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
            <i className="fab fa-github fa-2x" />
          </a>
          {student.treehouse
            ? (<a className="logo" href={student.treehouse} target="_blank" rel="noopener noreferrer" style={{ color: '#5FCF80' }}><i className="far fa-tree fa-2x" ></i></a>)
            : ''
          }
          {student.freeCodeCamp
            ? (<a className="logo" href={student.freeCodeCamp} target="_blank" rel="noopener noreferrer" style={{ color: '#0A0A23' }}><i className="fab fa-free-code-camp fa-2x"></i></a>)
            : ''
          }
          {student.codeAcademy
            ? (<a className="logo" href={student.codeAcademy} target="_blank" rel="noopener noreferrer" style={{ color: '#141C3A' }}><i className="far fa-brackets fa-2x"></i></a>)
            : ''
          }
          {student.replIt
            ? (<a className="logo" href={student.replIt} target="_blank" rel="noopener noreferrer" style={{ color: '#697D85' }}><i className="far fa-galaxy fa-2x"></i></a>)
            : ''
          }
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
