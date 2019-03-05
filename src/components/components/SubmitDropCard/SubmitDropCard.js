import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import moment from 'moment';

import './SubmitDropCard.scss';
import assignmentRequests from '../../../helpers/data/assignmentRequests';

class SubmitDropCard extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
  };

  render() {
    const { item, index } = this.props;

    return (
      <Draggable key={item.assignmentId} draggableId={item.assignmentId} index={index}>
        {(provided, snapshot) => (
          <div className="card submit-drop-card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ border: snapshot.isDragging ? '5px solid greenyellow' : '1px solid grey', ...provided.draggableProps.style }}
          >
            <div className="card-header">
              {item.title}
            </div>
            <div className="card-body">
              <h5 className="card-title">Due Date: {moment(item.dueDate).format('LL')}</h5>
              <div>Get the assignment <a href={item.URL} target="_blank" rel="noopener noreferrer">HERE</a></div>
              <div>Topic: {item.topic}</div>
              <div>Notes: {item.notes}</div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default SubmitDropCard;
