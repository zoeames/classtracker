import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import SubmitDropCard from '../SubmitDropCard/SubmitDropCard';

import './SubmitDropColumn.scss';

class SubmitDropColumn extends React.Component {
  static propTypes = {
    droppableId: PropTypes.string,
    items: PropTypes.array,
    editUrlFunc: PropTypes.func,
  };

  render() {
    const { droppableId, items, editUrlFunc } = this.props;
    const makeCards = items.map((item, index) => (
      <SubmitDropCard key={`item${index}`} item={item} index={index} editUrlFunc={editUrlFunc}/>
    ));

    return (
      <Droppable droppableId={droppableId}>
        {(provided1, snapshot1) => (
          <div
            ref={provided1.innerRef}
            style={{ background: snapshot1.isDraggingOver ? 'lightblue' : 'lightgrey' }}
            className="submit-drop-column"
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
