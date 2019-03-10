import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import './GithubModal.scss';
import submitAssignmentRequests from '../../../helpers/data/submitAssignmentRequests';

class GithubModal extends React.Component {
  state={
    githubUrl: '',
    assignmentTitle: '',
  }

  componentDidUpdate(prevProps) {
    const { submitAssignmentId } = this.props;
    if (prevProps.submitAssignmentId !== this.props.submitAssignmentId && submitAssignmentId !== '-1') {
      submitAssignmentRequests.getAssignmentTitleFromSubmitAssignmentId(submitAssignmentId)
        .then((response1) => {
          this.setState({ assignmentTitle: response1.title });
          submitAssignmentRequests.getSingleSubmitAssignmentById(submitAssignmentId)
            .then((response2) => {
              this.setState({ githubUrl: response2.data.githubUrl });
            });
        })
        .catch(err => console.error('err', err));
    }
  }

  urlChange = (e) => {
    e.preventDefault();
    const tempUrl = { ...this.state.githubUrl };
    tempUrl.githubUrl = e.target.value;
    this.setState({ githubUrl: tempUrl.githubUrl });
  }

  saveUrl = () => {
    const { githubUrl } = this.state;
    const { submitAssignmentId, toggleModal } = this.props;
    const updateAssignment = {
      githubUrl,
      submitAssignmentId,
    };

    submitAssignmentRequests.updateGithub(updateAssignment)
      .then(() => toggleModal())
      .catch(err => console.error('err', err));
  }

  render() {
    const { toggle, toggleModal } = this.props;
    const { assignmentTitle, githubUrl } = this.state;
    return (
      <Modal isOpen={toggle} toggle={toggleModal} className='GithubModal'>
        <ModalHeader toggle={toggleModal}>Github Repository</ModalHeader>
        <ModalBody>
          <strong>Assignment:</strong>
          <p>{assignmentTitle}</p>
          <strong>Github Repo URL:</strong>
          <br />
          <input
            id="githubUrl"
            className="col"
            type="text"
            aria-describedby="githuburl"
            value={githubUrl}
            onChange={this.urlChange} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.saveUrl}>Save</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default GithubModal;
