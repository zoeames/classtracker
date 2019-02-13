import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/students.json`)
    .then((res) => {
      const students = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          students.push(res.data[fbKey]);
        });
      }
      resolve(students);
    })
    .catch(err => reject(err));
});

const getTreehouseProfilePoints = url => axios
  .get(`${url}.json`)
  .then(treehouseProfile => treehouseProfile.data.points.total)
  .catch(error => error);

const getSingleStudent = uid => new Promise((resolve, reject) => {
  axios
    .get(`${apiKeys.firebaseConfig.databaseURL}/students.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const students = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((fbKey) => {
          res.data[fbKey].id = fbKey;
          students.push(res.data[fbKey]);
        });
      }
      resolve(students[0]);
    })
    .catch(err => reject(err));
});

export default { getRequest, getTreehouseProfilePoints, getSingleStudent };
