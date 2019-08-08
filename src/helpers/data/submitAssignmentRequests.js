import axios from 'axios';
import apiKeys from '../apiKeys';
import assignmentRequests from './assignmentRequests';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getSubmitAssignmentsByUid = uid => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/submitAssignments.json?orderBy="uid"&equalTo="${uid}"`)
    .then((assignmentObject) => {
      const assignments = [];
      const assignmentCollection = assignmentObject.data;
      Object.keys(assignmentCollection).forEach((key) => {
        assignmentCollection[key].submitAssignmentId = key;
        assignments.push(assignmentCollection[key]);
      });
      resolve(assignments);
    })
    .catch(err => reject(err));
});

const smashLists = (assignments, myAssignments) => {
  for (let i = 0; i < assignments.length; i += 1) {
    const assignment = assignments[i];
    assignment.status = 'backlog';
    for (let j = 0; j < myAssignments.length; j += 1) {
      const myAssignment = myAssignments[j];
      if (assignment.assignmentId === myAssignment.assignmentId) {
        assignment.githubUrl = myAssignment.githubUrl;
        assignment.status = myAssignment.status;
        assignment.submitAssignmentId = myAssignment.submitAssignmentId;
        assignment.isEditing = false;
        assignment.submissionDate = myAssignment.submissionDate;
      }
    }
  }
  return assignments;
};

const getSingleSubmitAssignment = submitAssignmentId => axios.get(`${baseUrl}/submitAssignments/${submitAssignmentId}.json`);

const getAssignmentTitleFromSubmitAssignmentId = submitAssignmentId => new Promise((resolve, reject) => {
  getSingleSubmitAssignment(submitAssignmentId)
    .then((submitAssignment) => {
      const { assignmentId } = submitAssignment.data;
      assignmentRequests.getSingleAssignmentById(assignmentId).then((assignment) => {
        resolve(assignment.data);
      });
    })
    .catch(err => reject(err));
});

const getSingleSubmitAssignmentById = assignmentId => axios.get(`${baseUrl}/submitAssignments/${assignmentId}.json`);

const postNewAssignment = newAssignment => axios.post(`${baseUrl}/submitAssignments.json`, newAssignment);

const updateGithub = assignment => axios.patch(`${baseUrl}/submitAssignments/${assignment.submitAssignmentId}.json`, { githubUrl: assignment.githubUrl });

const completeAssignment = submitAssignmentId => axios.patch(`${baseUrl}/submitAssignments/${submitAssignmentId}.json`, { status: 'done', submissionDate: Date.now() });

const excuseAssignment = submitAssignmentId => axios.patch(`${baseUrl}/submitAssignments/${submitAssignmentId}.json`, { status: 'excused' });

const resetAssignment = submitAssignmentId => axios.patch(`${baseUrl}/submitAssignments/${submitAssignmentId}.json`, { status: 'inProgress' });

export default {
  completeAssignment,
  excuseAssignment,
  getAssignmentTitleFromSubmitAssignmentId,
  getSingleSubmitAssignmentById,
  getSubmitAssignmentsByUid,
  postNewAssignment,
  resetAssignment,
  smashLists,
  updateGithub,
};
