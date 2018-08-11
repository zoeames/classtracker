import firebase from 'firebase';

const logoutUser = () => {
  return firebase.auth().signOut();
};

const authenticateGithub = () => {
  return new Promise((resolve, reject) => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then((authData) => {
      resolve(authData);
      // this.studentService.getSingleStudent(authData.user.uid)
      //   .then(fbStudent => {
          // const localStorageKey = `firebase:authUser:${this.FIREBASE_CONFIG.apiKey}:[DEFAULT]`;
          // const localStorageString = this.$window.localStorage[localStorageKey];
          // const localStorageObject = JSON.parse(localStorageString);
          // localStorageObject.isInstructor = !fbStudent.isStudent || false;
          // this.$window.localStorage[localStorageKey] = JSON.stringify(localStorageObject);

        // })
        // .catch(err => {
        //   console.error('error in get single student', err);
        // });
    }).catch((error) => {
      reject(error);
    });
  });
};

const getUid = () => {
  return firebase.auth().currentUser.uid;
};

export default { getUid, logoutUser, authenticateGithub };
