app.service("StudentService", function ($q, $http, FIREBASE_CONFIG) {

  var getStudentList = function () {
    let students = [];
    return $q(function (resolve, reject) {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/students.json`)
        .then(function (studentObject) {
          var studentCollection = studentObject.data;
          Object.keys(studentCollection).forEach(function (key) {
            studentCollection[key].id = key;
            students.push(studentCollection[key]);
          });
          resolve(students);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

  var getTreehouseProfilePoints = function (url) {
    return $http.get(`${url}.json`)
      .then(function (treehouseProfile) {
        return treehouseProfile.data.points.total;
      })
      .catch(function (error) {
        return errror;
      });
  };

  return { getStudentList: getStudentList, getTreehouseProfilePoints: getTreehouseProfilePoints };
});
