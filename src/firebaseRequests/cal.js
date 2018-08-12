import axios from 'axios';
import constants from '../constants';

const getCalEventsRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/cal.json`)
      .then(res => {
        const events = [];
        const calCollection = res.data;
        Object.keys(calCollection).forEach((key) => {
          calCollection[key].id = key;
          events.push(calCollection[key]);
        });
        resolve(events);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default { getCalEventsRequest };
