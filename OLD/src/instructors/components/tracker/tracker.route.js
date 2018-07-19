
import { trackerComponentName } from './tracker.component';

const trackerConfig = {
  name: 'instructors.tracker',
  url: '/tracker',
  component: trackerComponentName,
  data: {
    authRequired: true,
    instructorsRequired: true,
  },
};

export default [trackerConfig];