import * as firebase from 'firebase';

function appRun(FIREBASE_CONFIG) {
  'ngInject';

  firebase.initializeApp(FIREBASE_CONFIG);
}

export default appRun;
