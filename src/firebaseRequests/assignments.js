import axios from 'axios';
import constants from '../constants';

const getAssignmentList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/assignments.json`)
      .then(res => {
        const assignments = [];
        const assignmentCollection = res.data;
        Object.keys(assignmentCollection).forEach((key) => {
          assignmentCollection[key].id = key;
          assignments.push(assignmentCollection[key]);
        });
        resolve(assignments);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getGithubAssignmentList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/assignments.json?orderBy="isGithub"&equalTo="true"`)
      .then(res => {
        const assignments = [];
        const assignmentCollection = res.data;
        Object.keys(assignmentCollection).forEach((key) => {
          assignmentCollection[key].assignmentId = key;
          assignments.push(assignmentCollection[key]);
        });
        resolve(assignments);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default { getAssignmentList, getGithubAssignmentList };
