import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import SubmitDropColumn from '../../components/SubmitDropColumn/SubmitDropColumn';

import assignmentRequests from '../../../helpers/data/assignmentRequests';
import authRequests from '../../../helpers/data/authRequests';
import submitAssignmentRequests from '../../../helpers/data/submitAssignmentRequests';

import './Submit.scss';

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
    done: [],
    assignments: [],
  };

  getGithubAssignments() {
    const uid = authRequests.getCurrentUid();
    assignmentRequests.getGithubAssignmentList().then((fbAssignments) => {
      submitAssignmentRequests.getSubmitAssignmentsByUid(uid)
        .then((myAssignments) => {
          const combinedAssignments = submitAssignmentRequests.smashLists(
            fbAssignments,
            myAssignments,
          );
          combinedAssignments.sort(
            (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
          );
          const backlog = combinedAssignments.filter(x => x.status === 'backlog');
          const inProgress = combinedAssignments.filter(x => x.status === 'inProgress');
          const done = combinedAssignments.filter(x => x.status === 'done');
          this.setState({
            assignments: combinedAssignments,
            backlog,
            inProgress,
            done,
          });
        });
    });
  }

  componentDidMount() {
    this.getGithubAssignments();
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: 'backlog',
    droppable2: 'inProgress',
    droppable3: 'done',
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    if (destination.droppableId === 'droppable' && source.droppableId !== 'droppable') {
      // assignment is in backlog
      console.log('backlog');
    } else if (source.droppableId === 'droppable' && destination.droppableId === 'droppable2') {
      // assignment moving from backlog to inProgress
      const newSubmitAssignment = {
        assignmentId: result.draggableId,
        uid: authRequests.getCurrentUid(),
        githubUrl: '',
        status: 'inProgress',
      };
      submitAssignmentRequests.postNewAssignment(newSubmitAssignment)
        .then(() => this.getGithubAssignments())
        .catch(err => console.error('err', err));
    } else if (destination.droppableId === 'droppable3' && source.droppableId !== 'droppable3') {
      // assignment is done
      console.log('done');
    }


    // if (source.droppableId === destination.droppableId) {
    //   const backlog = reorder(
    //     this.getList(source.droppableId),
    //     source.index,
    //     destination.index,
    //   );

    //   let state = { backlog };

    //   if (source.droppableId === 'droppable2') {
    //     state = { inProgress: backlog };
    //   }

    //   this.setState(state);
    // } else {
    //   const result2 = move(
    //     this.getList(source.droppableId),
    //     this.getList(destination.droppableId),
    //     source,
    //     destination,
    //   );

    //   this.setState({
    //     backlog: result2.droppable,
    //     inProgress: result2.droppable2,
    //     done: result2.droppable3,
    //   });
    // }
  };

  render() {
    const { backlog, inProgress, done } = this.state;
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
                <SubmitDropColumn droppableId="droppable3" items={done} />
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    );
  }
}

export default Submit;
