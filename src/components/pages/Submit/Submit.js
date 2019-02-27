import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import SubmitDropColumn from '../../components/SubmitDropColumn/SubmitDropColumn';
import './Submit.scss';

// fake data generator
const getItems = (count, offset = 0) => Array.from({ length: count }, (v, k) => k).map(k => ({
  id: `item-${k + offset}`,
  content: `item ${k + offset}`,
}));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class Submit extends React.Component {
  state = {
    backlog: [],
    inProgress: [],
  };

  componentDidMount() {
    const backlog = getItems(10);
    const inProgress = getItems(5, 10);
    this.setState({ backlog, inProgress });
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: 'backlog',
    droppable2: 'inProgress',
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result);

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const backlog = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index,
      );

      let state = { backlog };

      if (source.droppableId === 'droppable2') {
        state = { inProgress: backlog };
      }

      this.setState(state);
    } else {
      const result2 = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination,
      );

      this.setState({
        backlog: result2.droppable,
        inProgress: result2.droppable2,
      });
    }
  };

  render() {
    const { backlog, inProgress } = this.state;
    return (
      <div className="Submit">
        <h1>Submit Page</h1>
        <div className="container">
          <div className="row">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div className="col-sm">
                <h3>Backlog</h3>
                <SubmitDropColumn droppableId="droppable" items={backlog} />
              </div>
              <div className="col-sm">
                <h3>In Progress</h3>
                <SubmitDropColumn droppableId="droppable2" items={inProgress} />
              </div>
              <div className="col-sm">
                <h3>Done</h3>
                {/* <SubmitDropColumn droppableId="droppable2" items={done} /> */}
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    );
  }
}

export default Submit;
