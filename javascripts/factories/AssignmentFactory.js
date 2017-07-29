"use strict";
app.factory("AssignmentFactory", function($q, $http, FIREBASE_CONFIG) {

  var getAssignmentList = function() {
    let assignments = [];
    return $q(function(resolve, reject) {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/assignments.json`)
        .then(function(assignmentObject) {
          var assignmentCollection = assignmentObject.data;
          Object.keys(assignmentCollection).forEach(function(key) {
            assignmentCollection[key].id = key;
            assignments.push(assignmentCollection[key]);
          });
          resolve(assignments);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  };

  var getThisWeek = function() {
    let assignments = [];
    return $q(function(resolve, reject) {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/thisWeek.json`)
        .then(function(assignmentObject) {
          var assignmentCollection = assignmentObject.data;
          Object.keys(assignmentCollection).forEach(function(key) {
            assignmentCollection[key].id = key;
            assignments.push(assignmentCollection[key]);
          });
          resolve(assignments);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  };

  var getNextWeek = function() {
    let assignments = [];
    return $q(function(resolve, reject) {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/nextWeek.json`)
        .then(function(assignmentObject) {
          var assignmentCollection = assignmentObject.data;
          Object.keys(assignmentCollection).forEach(function(key) {
            assignmentCollection[key].id = key;
            assignments.push(assignmentCollection[key]);
          });
          resolve(assignments);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  };

  return { getAssignmentList: getAssignmentList, getThisWeek: getThisWeek, getNextWeek: getNextWeek };

});