app.run(function(FIREBASE_CONFIG) {
  firebase.initializeApp(FIREBASE_CONFIG);
});

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/assignemnts.html',
      controller: 'AssignmentCtrl'
    })
    .when('/pathfinder', {
      templateUrl: 'partials/pathfinder.html',
      controller: 'PathfinderCtrl'
    })
    .otherwise('/');
});