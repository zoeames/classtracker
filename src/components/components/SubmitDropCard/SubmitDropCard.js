import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

import './SubmitDropCard.scss';

class SubmitDropCard extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    editUrlFunc: PropTypes.func,
  };

  state={
    tooltipOpen: false,
  }

  toggle = () => {
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  }

  editButton = () => {
    const { editUrlFunc, item } = this.props;
    editUrlFunc(item.submitAssignmentId);
  }


  render() {
    const { item, index } = this.props;
    const { tooltipOpen } = this.state;

    const cardHeaderColor = () => {
      let headerStyles = 'card-header';
      switch (item.status) {
        case 'inProgress':
          headerStyles += ' bg-warning';
          break;
        default:
          headerStyles += ' bg-secondary';
      }
      return headerStyles;
    };

    const cardBodyColor = () => {
      let bodyStyles = 'card-body';
      switch (item.status) {
        case 'inProgress':
          bodyStyles += ' border-warning';
          break;
        default:
          bodyStyles += ' border-secondary';
      }
      return bodyStyles;
    };

    const githubLink = () => {
      if (item.status !== 'backlog') {
        return (
          <div>
            <button className="btn btn-primary" href={item.githubUrl}><i className="fab fa-github"></i></button>
            <button className="btn btn-light" onClick={this.editButton} id={`github-link-${item.assignmentId}`}><i className="fas fa-pencil-alt"></i></button>
            <Tooltip placement="top" className="github-tooltip" isOpen={tooltipOpen} target={`github-link-${item.assignmentId}`} toggle={this.toggle}>
              { item.githubUrl }
            </Tooltip>
          </div>
        );
      }
      return '';
    };

    return (
      <Draggable key={item.assignmentId} draggableId={item.assignmentId} index={index}>
        {(provided, snapshot) => (
          <div className="card submit-drop-card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ border: snapshot.isDragging ? '5px solid greenyellow' : '1px solid grey', ...provided.draggableProps.style }}
          >
            <div className={cardHeaderColor()}>
              {item.title}
            </div>
            <div className={cardBodyColor()}>
              <h5 className="card-title">Due Date: {moment(item.dueDate).format('LL')}</h5>
              <div>Get the assignment <a href={item.URL} target="_blank" rel="noopener noreferrer">HERE</a></div>
              <div>Topic: {item.topic}</div>
              <div>Notes: {item.notes}</div>
              { githubLink() }
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default SubmitDropCard;
