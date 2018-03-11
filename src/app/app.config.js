import assignmentsRoutes from './components/assignments/assignments.route';
import calendarRoutes from './components/calendar/calendar.route';
import studentsRoutes from './components/students/students.route';
import submitRoutes from './components/submit/submit.route';
import assignmentTrackerRoutes from './components/assignment_tracker/assignment_tracker.route';

const allRoutes = [
  ...assignmentsRoutes,
  ...studentsRoutes,
  ...calendarRoutes,
  ...submitRoutes,
  ...assignmentTrackerRoutes,
];

function routing($stateProvider, $urlRouterProvider) {
  'ngInject';

  allRoutes.forEach(state => $stateProvider.state(state));
  $urlRouterProvider.otherwise('/assignments');
}

export default routing;