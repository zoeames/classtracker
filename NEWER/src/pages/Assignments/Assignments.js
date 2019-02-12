import React from 'react';

import './Assignments.scss';

import assignmentRequests from '../../firebaseRequests/assignments';
import AssignmentListGroup from '../../components/AssignmentListGroup/AssignmentListGroup';

class Assignments extends React.Component {
  state = {
    assignments: [],
  };

  componentDidMount() {
    assignmentRequests
      .getAssignmentList()
      .then((fbAssignments) => {
        fbAssignments.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        this.setState({ assignments: fbAssignments });
      })
      .catch(err => console.error('error with get assignments request', err));
  }

  render() {
    const showAssignments = () => {
      const dates = [
        ...new Set(
          this.state.assignments.map(assignment => assignment.dueDate)
        ),
      ].sort().reverse();
      return dates.map((date) => {
        const selectedAssignments = this.state.assignments.filter(assignment => assignment.dueDate === date);
        if (selectedAssignments.length > 0) {
          return (
            <AssignmentListGroup
              key={date}
              assignments={selectedAssignments}
              dueDate={date}
            />
          );
        }
        return '';
      });
    };

    return (
      <div className="Assignments">
        <h1>Assignments</h1>
        {showAssignments()}
      </div>
    );
  }
}

export default Assignments;
