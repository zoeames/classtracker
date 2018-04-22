import * as firebase from 'firebase';

export const authServiceName = 'authService';

export default class authService {
  constructor($q, $window, FIREBASE_CONFIG, studentService) {
    'ngInject';

    this.FIREBASE_CONFIG = FIREBASE_CONFIG;
    this.$window = $window;
    this.$q = $q;
    this.studentService = studentService;
  }

  authenticateGithub() {
    return this.$q((resolve, reject) => {
      const provider = new firebase.auth.GithubAuthProvider();
      firebase.auth().signInWithPopup(provider).then((authData) => {
        this.studentService.getSingleStudent(authData.user.uid)
        .then(fbStudent => {
          const localStorageKey = `firebase:authUser:${this.FIREBASE_CONFIG.apiKey}:[DEFAULT]`;
          const localStorageString = this.$window.localStorage[localStorageKey];
          const localStorageObject = JSON.parse(localStorageString);
          localStorageObject.isInstructor = !fbStudent.isStudent || false;
          this.$window.localStorage[localStorageKey] = JSON.stringify(localStorageObject);
          resolve(authData);
        })
        .catch(err => {
          console.error("error in get single student", err);
        });
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

  isInstructor() {
    const localStorageKey = `firebase:authUser:${this.FIREBASE_CONFIG.apiKey}:[DEFAULT]`;
    const localStorageValue = this.$window.localStorage[localStorageKey];
    if (localStorageValue) {
      return JSON.parse(localStorageValue).isInstructor;
    }
    return false;
  }
}