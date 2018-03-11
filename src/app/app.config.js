import assignmentsRoutes from './components/assignments/assignments.route';
import calendarRoutes from './components/calendar/calendar.route';
import studentsRoutes from './components/students/students.route';
import submitRoutes from './components/submit/submit.route';
import trackerRoutes from './components/tracker/tracker.route';
import studentProgressRoutes from './components/student_progress/student_progress.route';

const allRoutes = [
  ...assignmentsRoutes,
  ...studentsRoutes,
  ...calendarRoutes,
  ...submitRoutes,
  ...trackerRoutes,
  ...studentProgressRoutes,
];

function routing($stateProvider, $urlRouterProvider) {
  'ngInject';

  allRoutes.forEach(state => $stateProvider.state(state));
  $urlRouterProvider.otherwise('/assignments');
}

export default routing;