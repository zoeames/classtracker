/* eslint-disable max-len */
import React from 'react';

import './BadStudent.scss';

class BadStudent extends React.Component {
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
    const githubLink = `https://github.com/${student.githubUsername}`;
    return (
      <tr className="BadStudent">
        <td className="col-xs-3">
          {student.firstName} {student.lastName}
        </td>
        <td className="col-xs-3">
          <a className="logo" href={githubLink} target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
            <i className="fab fa-github fa-2x" />
          </a>
        </td>
        <td className="col-xs-3">
          {student.freeCodeCamp
            ? (<><p>{student.fccPercentage}%</p><a className="logo" href={student.freeCodeCamp} target="_blank" rel="noopener noreferrer" style={{ color: '#0A0A23' }}><i className="fab fa-free-code-camp fa-2x"></i></a></>)
            : ''
          }
        </td>
        <td className="col-xs-3">
          {student.codeAcademy
            ? (<><p>{student.caPercentage}%</p><a className="logo" href={student.codeAcademy} target="_blank" rel="noopener noreferrer" style={{ color: '#141C3A' }}><i className="far fa-brackets fa-2x"></i></a></>)
            : ''
          }
        </td>
        <td className="col-xs-3">
          {student.replIt
            ? (<><p>{student.replCount}</p><a className="logo" href={student.replIt} target="_blank" rel="noopener noreferrer" style={{ color: '#697D85' }}><i className="far fa-galaxy fa-2x"></i></a></>)
            : ''
          }
        </td>

      </tr>
    );
  }
}

export default BadStudent;
