export const assignmentServiceName = 'assignmentService';

export default class assignmentService {
  constructor($http, $q, FIREBASE_CONFIG) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;
    this.FB = FIREBASE_CONFIG;
  }

  getAssignmentList() {
    const assignments = [];
    return this.$q((resolve, reject) => {
      this.$http.get(`${this.FB.databaseURL}/assignments.json`)
        .then((assignmentObject) => {
          const assignmentCollection = assignmentObject.data;
          Object.keys(assignmentCollection).forEach((key) => {
            assignmentCollection[key].id = key;
            assignments.push(assignmentCollection[key]);
          });
          resolve(assignments);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}