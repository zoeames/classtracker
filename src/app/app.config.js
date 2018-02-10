import assignmentsRoutes from './components/assignments/assignments.route';
import calendarRoutes from './components/calendar/calendar.route';
import studentsRoutes from './components/students/students.route';

const allRoutes = [
  ...assignmentsRoutes,
  ...studentsRoutes,
  ...calendarRoutes,
];

function routing($stateProvider, $urlRouterProvider) {
  'ngInject';

  allRoutes.forEach(state => $stateProvider.state(state));
  $urlRouterProvider.otherwise('/assignments');
}

export default routing;