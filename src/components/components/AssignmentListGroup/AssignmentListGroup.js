import React from 'react';
import moment from 'moment';

import './AssignmentListGroup.scss';

class AssignmentListGroup extends React.Component {
  render() {
    const { assignments, dueDate } = this.props;
    const assignmentList = assignments.map(assignment => (
      <div key={assignment.id} className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="row">
          <div className="col-3 text-left">
            <h5>{assignment.title}</h5>
          </div>
          <div className="col-8 text-left">
            <p>{assignment.notes}</p>
            <small><a href={assignment.URL} target="_blank" rel="noopener noreferrer">View Assignment</a></small>
          </div>
          <div className="col text-right">
            <small>{assignment.topic}</small>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="AssignmentListGroup">
        <h3>Due: {moment(dueDate).format('LL')}</h3>
        <div className="list-group">
          {assignmentList}
        </div>
      </div>
    );
  }
}

export default AssignmentListGroup;
