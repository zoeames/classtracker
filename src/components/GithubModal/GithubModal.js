import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import './GithubModal.scss';
import submitAssignmentRequests from '../../helpers/data/submitAssignmentRequests';

class GithubModal extends React.Component {
  state={
    githubUrl: '',
    assignmentTitle: '',
  }

  componentDidUpdate(prevProps) {
    const { submitAssignmentId } = this.props;
    if (prevProps.submitAssignmentId !== this.props.submitAssignmentId && submitAssignmentId !== '-1') {
      submitAssignmentRequests.getAssignmentTitleFromSubmitAssignmentId(submitAssignmentId)
        .then((response) => {
          this.setState({ assignmentTitle: response.title });
        })
        .catch(err => console.error('err', err));
    }
  }


  render() {
    const { toggle, toggleModal } = this.props;
    const { assignmentTitle } = this.state;
    return (
      <Modal isOpen={toggle} toggle={toggleModal} className='GithubModal'>
        <ModalHeader toggle={toggleModal}>Github Repository</ModalHeader>
        <ModalBody>
          <strong>Assignment:</strong>
          <p>{assignmentTitle}</p>
          <strong>Github Repo URL:</strong>
          <br />
          <input id="githubUrl" className="col" type="text" placeholder="https://github.com/zoeames/class-deadlines" />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>Save</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default GithubModal;
