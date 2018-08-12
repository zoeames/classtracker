import firebase from 'firebase';

import studentRequests from './students';

const logoutUser = () => {
  return firebase.auth().signOut();
};

const authenticateGithub = () => {
  return new Promise((resolve, reject) => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then((authData) => {
      studentRequests.getSingleStudent(authData.user.uid)
        .then(fbStudent => {
          resolve(fbStudent);
        });
    }).catch((error) => {
      reject(error);
    });
  });
};

const getUid = () => {
  return firebase.auth().currentUser.uid;
};

export default { getUid, logoutUser, authenticateGithub };
