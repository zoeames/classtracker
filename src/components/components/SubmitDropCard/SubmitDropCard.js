import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import './SubmitDropCard.scss';

class SubmitDropCard extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
  };

  render() {
    const { item, index } = this.props;
    const itemId = `item${item.assignedNumber}`;

    return (
      <Draggable key={itemId} draggableId={itemId} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ border: snapshot.isDragging ? '5px solid greenyellow' : '1px solid grey', ...provided.draggableProps.style }}
            className="submit-drop-card"
          >
            {item.title}
          </div>
        )}
      </Draggable>
    );
  }
}

export default SubmitDropCard;
