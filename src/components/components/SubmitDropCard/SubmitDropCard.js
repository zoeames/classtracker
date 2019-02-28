import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './SubmitDropCard.scss';

class SubmitDropCard extends React.Component {
  state={
    grid: 8,
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: this.state.grid * 2,
    margin: `0 0 ${this.state.grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  render() {
    const { item, index } = this.props;

    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={this.getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
            )}
          >
            {item.content}
          </div>
        )}
      </Draggable>
    );
  }
}

export default SubmitDropCard;
