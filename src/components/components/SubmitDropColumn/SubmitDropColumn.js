import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './SubmitDropColumn.scss';

class SubmitDropColumn extends React.Component {
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

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: this.state.grid,
    width: 250,
  });

  render() {
    const { droppableId, items } = this.props;
    return (
      <Droppable droppableId={droppableId}>
        {(provided1, snapshot1) => (
          <div
            ref={provided1.innerRef}
            style={this.getListStyle(snapshot1.isDraggingOver)}
          >
            {items.map((item, index) => (
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
            ))}
            {provided1.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default SubmitDropColumn;
