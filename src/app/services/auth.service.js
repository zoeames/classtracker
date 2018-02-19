import * as firebase from 'firebase';

export const authServiceName = 'authService';

export default class authService {
  constructor($q, $window, FIREBASE_CONFIG) {
    'ngInject';

    this.FIREBASE_CONFIG = FIREBASE_CONFIG;
    this.$window = $window;
    this.$q = $q;
  }

  authenticateGithub() {
    return this.$q((resolve, reject) => {
      const provider = new firebase.auth.GithubAuthProvider();
      firebase.auth().signInWithPopup(provider).then((authData) => {
        resolve(authData);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  get isAuthenticated() {
    return !!this.getCurrentUid();
  }

  getCurrentUid() {
    const localStorageKey = `firebase:authUser:${this.FIREBASE_CONFIG.apiKey}:[DEFAULT]`;
    const localStorageValue = this.$window.localStorage[localStorageKey];
    if (localStorageValue) {
      return JSON.parse(localStorageValue).uid;
    }
    return false;
  }

  logout() {
    firebase.auth().signOut();
    this.$window.localStorage.clear();
  }
}