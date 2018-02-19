export const submitAssignmentServiceName = "submitAssignmentService";

export default class SubmitAssignmentService {
  constructor($http, $q, FIREBASE_CONFIG) {
    "ngInject";

    this.$http = $http;
    this.$q = $q;
    this.FB = FIREBASE_CONFIG;
  }

  postNewAssignment(data) {
    return this.$http.post(`${this.FB.databaseURL}/submitAssignments.json`, JSON.stringify(data));
  }
}
