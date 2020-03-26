import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.githubProxyUrl;

const getRecentActivityRequest = githubUsername => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/recent_activity/${githubUsername}`)
    .then(res => resolve(res.data))
    .catch(err => reject(err));
});

const getUser = githubUsername => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/get_github_user/${githubUsername}`)
    .then(res => resolve(res.data))
    .catch(err => reject(err));
});

export default { getRecentActivityRequest, getUser };
