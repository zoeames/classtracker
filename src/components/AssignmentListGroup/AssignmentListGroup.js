import React from 'react';
import moment from 'moment';

import './AssignmentListGroup.css';

class AssignmentListGroup extends React.Component {
  render() {
    const {assignments, dueDate} = this.props;
    const assignmentList = assignments.map((assignment) => {
      return (
        <a key={assignment.id} className="list-group-item list-group-item-action flex-column align-items-start active">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">List group item heading</h5>
            <small>3 days ago</small>
          </div>
          <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small>Donec id elit non mi porta.</small>
        </a>
      );
    });
    return (
      <div>
        <h3>{moment(dueDate).format('LL')}</h3>
        <div className="list-group">
          {assignmentList}
        </div>
      </div>
    );
  }
}

export default AssignmentListGroup;
