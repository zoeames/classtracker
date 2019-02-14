import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.githubProxyUrl;

const getRecentActivityRequest = githubUsername => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/recent_activity/${githubUsername}`)
    .then(res => resolve(res.data))
    .catch(err => reject(err));
});

export default { getRecentActivityRequest };
