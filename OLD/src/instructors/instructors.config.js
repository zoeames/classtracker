import { instructorsParentRoutes } from './instructors.route';

import trackerRoutes from './components/tracker/tracker.route';


const instructorsRoutes = [
  ...instructorsParentRoutes,
  ...trackerRoutes,

];

function configureModule($stateProvider) {
  'ngInject';

  instructorsRoutes.forEach(state => $stateProvider.state(state));
}

export default configureModule;