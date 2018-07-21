import axios from 'axios';
import constants from '../constants';

const getRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/students.json`)
      .then(res => {
        const students = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            students.push(res.data[fbKey]);
          });
        }
        resolve(students);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getTreehouseProfilePoints = (url) => {
  return axios
    .get(`${url}.json`)
    .then(treehouseProfile => treehouseProfile.data.points.total)
    .catch(error => error);
};

const getSingleStudent = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/students.json?orderBy="uid"&equalTo="${uid}"`)
      .then(res => {
        const students = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            students.push(res.data[fbKey]);
          });
        }
        resolve(students[0]);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default { getRequest, getTreehouseProfilePoints, getSingleStudent };
