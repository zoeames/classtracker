import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

// Components
import { trackerComponent, trackerComponentName } from './components/tracker/tracker.component';

import configureModule from './instructors.config';

import setInstructorRedirects from './instructors.run';

export default angular.module('instructors', [
  uiRouter,
])
  .component(trackerComponentName, trackerComponent)
  .config(configureModule)
  .run(setInstructorRedirects)
  .name;
