import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import './GithubModal.scss';

class GithubModal extends React.Component {
  state={
    githubUrl: '',
  }

  render() {
    const { toggle, toggleModal, submitAssignmentId } = this.props;
    return (
      <Modal isOpen={toggle} toggle={toggleModal} className='GithubModal'>
        <ModalHeader toggle={toggleModal}>Github Repository</ModalHeader>
        <ModalBody>
          <strong>Assignment:</strong>
          <p>{submitAssignmentId}</p>
          <strong>Github Repo URL:</strong>
          <br />
          <input id="githubUrl" class="col" type="text" placeholder="https://github.com/zoeames/class-deadlines" />
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
