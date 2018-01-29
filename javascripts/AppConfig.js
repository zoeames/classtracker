app.run(function(FIREBASE_CONFIG) {
  firebase.initializeApp(FIREBASE_CONFIG);
});

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/assignemnts.html',
      controller: 'AssignmentCtrl'
    })
    .when('/students', {
      templateUrl: 'partials/students.html',
      controller: 'StudentCtrl'
    })
    .otherwise('/');
});