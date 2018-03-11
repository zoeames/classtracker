import angular from 'angular';
import uiBootstrap from 'angular-ui-bootstrap';
import uiRouter from '@uirouter/angularjs';
import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';
import 'angular-filter';
import 'moment';
import 'angular-bootstrap-calendar';
import 'angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css'

import appConstants from './app.constants';
import routing from './app.config';
import appRun from './app.run';

import { navbarComponent, navbarComponentName } from './components/navbar/navbar.component';
import { assignmentsComponent, assignmentsComponentName } from './components/assignments/assignments.component';
import { calendarComponent, calendarComponentName } from './components/calendar/calendar.component';
import { studentsComponent, studentsComponentName } from './components/students/students.component';
import { submitComponent, submitComponentName } from './components/submit/submit.component';

import AuthService, { authServiceName } from './services/auth.service';
import AssignmentService, { assignmentServiceName } from './services/assignment.service';
import StudentService, { studentServiceName } from './services/student.service';
import CalService, { calServiceName } from './services/cal.service';
import SubmitAssignmentService, { submitAssignmentServiceName } from './services/submitAssignment.service';

import '../style/app.css';

const classTrackerApp = angular.module('ClassTracker', [
  uiRouter,
  ngSanitize,
  ngAnimate,
  uiBootstrap,
  'angular.filter',
  'mwl.calendar'
]);

appConstants.forEach((con) => { classTrackerApp.constant(con.name, con.value); });

classTrackerApp.component(navbarComponentName, navbarComponent);
classTrackerApp.component(assignmentsComponentName, assignmentsComponent);
classTrackerApp.component(calendarComponentName, calendarComponent);
classTrackerApp.component(studentsComponentName, studentsComponent);
classTrackerApp.component(submitComponentName, submitComponent);

classTrackerApp.service(authServiceName, AuthService);
classTrackerApp.service(assignmentServiceName, AssignmentService);
classTrackerApp.service(studentServiceName, StudentService);
classTrackerApp.service(calServiceName, CalService);
classTrackerApp.service(submitAssignmentServiceName, SubmitAssignmentService);

classTrackerApp.config(routing);
classTrackerApp.run(appRun);

export default classTrackerApp.name;