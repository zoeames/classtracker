export const studentServiceName = 'studentService';

export default class studentService {
  constructor($http, $q, FIREBASE_CONFIG) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;
    this.FB = FIREBASE_CONFIG;
  }
  getStudentList() {
    const students = [];
    return this.$q((resolve, reject) => {
      this.$http.get(`${this.FB.databaseURL}/students.json`)
        .then((studentObject) => {
          const studentCollection = studentObject.data;
          Object.keys(studentCollection).forEach((key) => {
            studentCollection[key].id = key;
            students.push(studentCollection[key]);
          });
          resolve(students);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getTreehouseProfilePoints(url) {
    return this.$http.get(`${url}.json`)
      .then(treehouseProfile => treehouseProfile.data.points.total)
      .catch(error => error);
  }

  getSingleStudent(uid){
    const students = [];
    return this.$q((resolve, reject) => {
      this.$http.get(`${this.FB.databaseURL}/students.json?orderBy="uid"&equalTo="${uid}"`)
        .then((studentObject) => {
          const studentCollection = studentObject.data;
          Object.keys(studentCollection).forEach((key) => {
            studentCollection[key].id = key;
            students.push(studentCollection[key]);
          });
          resolve(students[0]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}