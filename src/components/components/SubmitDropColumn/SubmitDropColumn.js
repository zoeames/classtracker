import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import SubmitDropCard from '../SubmitDropCard/SubmitDropCard';
import './SubmitDropColumn.scss';

class SubmitDropColumn extends React.Component {
  state={
    grid: 8,
  }

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: this.state.grid,
    width: 250,
  });

  render() {
    const { droppableId, items } = this.props;
    const makeCards = items.map((item, index) => (
      <SubmitDropCard key={`item${index}`} item={item} index={index} />
    ));

    return (
      <Droppable droppableId={droppableId}>
        {(provided1, snapshot1) => (
          <div
            ref={provided1.innerRef}
            style={this.getListStyle(snapshot1.isDraggingOver)}
          >
            {makeCards}
            {provided1.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default SubmitDropColumn;
