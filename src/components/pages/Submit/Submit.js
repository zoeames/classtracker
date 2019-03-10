import React from 'react';
import { Alert } from 'reactstrap';
import { DragDropContext } from 'react-beautiful-dnd';

import SubmitDropColumn from '../../components/SubmitDropColumn/SubmitDropColumn';

import assignmentRequests from '../../../helpers/data/assignmentRequests';
import authRequests from '../../../helpers/data/authRequests';
import submitAssignmentRequests from '../../../helpers/data/submitAssignmentRequests';

import './Submit.scss';
import GithubModal from '../../components/GithubModal/GithubModal';

class Submit extends React.Component {
  state = {
    backlog: [],
    inProgress: [],
    done: [],
    assignments: [],
    githubModal: false,
    submitAssignmentId: '-1',
    visible: false,
  };

  toggleModal = () => {
    const { githubModal } = this.state;
    if (githubModal) {
      this.setState({ githubModal: false, submitAssignmentId: '-1' });
      this.getGithubAssignments();
    } else {
      this.setState({ githubModal: true });
    }
  }

  getGithubAssignments = () => {
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
          const complete = combinedAssignments.filter(x => x.status === 'done').sort(
            (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate),
          );
          const excused = combinedAssignments.filter(x => x.status === 'excused');
          const done = [...complete, ...excused];
          this.setState({
            assignments: combinedAssignments,
            backlog,
            inProgress,
            done,
          });
        });
    });
  }

  displayAlert = (alertType, alertTxt) => {
    this.setState({
      alertVisible: true,
      alertText: alertTxt,
      alertColor: alertType,
    }, () => {
      window.setTimeout(() => {
        this.setState({
          alertVisible: false,
          alertText: '',
          alertColor: '',
        });
      }, 3000);
    });
  }

  componentDidMount() {
    this.getGithubAssignments();
  }

  id2List = {
    droppable: 'backlog',
    droppable2: 'inProgress',
    droppable3: 'done',
  };

  getList = id => this.state[this.id2List[id]];

  editUrlFunc = (submitAssignmentId) => {
    this.setState({ submitAssignmentId });
    this.toggleModal();
  }

  onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === 'droppable' && destination.droppableId === 'droppable2') {
      // assignment moving from backlog to inProgress
      const newSubmitAssignment = {
        assignmentId: result.draggableId,
        uid: authRequests.getCurrentUid(),
        githubUrl: '',
        status: 'inProgress',
      };
      submitAssignmentRequests.postNewAssignment(newSubmitAssignment)
        .then((resp) => {
          this.setState({ submitAssignmentId: resp.data.name });
          this.getGithubAssignments();
          this.toggleModal();
        })
        .catch(err => console.error('err', err));
    } else if (destination.droppableId === 'droppable3' && source.droppableId !== 'droppable3' && source.droppableId !== 'droppable') {
      // assignment is done
      const assignment = this.state.inProgress.find(x => x.assignmentId === result.draggableId);
      if (assignment.githubUrl.length < 1) {
        this.displayAlert('danger', 'Assignments MUST have a github url in order to submit');
      } else {
        submitAssignmentRequests.completeAssignment(assignment.submitAssignmentId)
          .then(() => {
            this.getGithubAssignments();
          })
          .catch(err => console.error('err', err));
      }
    }
  };

  render() {
    const {
      alertText,
      alertColor,
      alertVisible,
      backlog,
      done,
      githubModal,
      inProgress,
      submitAssignmentId,
    } = this.state;
    return (
      <div className="Submit">
        <h1>Submit Page</h1>
        <div className="row">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="col-sm">
              <h3>Backlog</h3>
              <SubmitDropColumn droppableId="droppable" items={backlog} editUrlFunc={this.ditUrlFunc}/>
            </div>
            <div className="col-sm">
              <h3>In Progress</h3>
              <SubmitDropColumn droppableId="droppable2" items={inProgress} editUrlFunc={this.editUrlFunc}/>
            </div>
            <div className="col-sm">
              <h3>Done</h3>
              <SubmitDropColumn droppableId="droppable3" items={done} editUrlFunc={this.editUrlFunc}/>
            </div>
          </DragDropContext>
        </div>
        <GithubModal toggle={githubModal} toggleModal={this.toggleModal} submitAssignmentId={submitAssignmentId}/>
        <Alert color={alertColor} isOpen={ alertVisible } >
          <h3>{ alertText }</h3>
        </Alert>
      </div>
    );
  }
}

export default Submit;
