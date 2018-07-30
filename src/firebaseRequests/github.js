import axios from 'axios';
import constants from '../constants';

const getRecentActivityRequest = (githubUsername) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.githubProxyUrl}/recent_activity/${githubUsername}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default { getRecentActivityRequest };
