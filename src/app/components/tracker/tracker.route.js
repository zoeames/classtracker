
import { trackerComponentName } from './tracker.component';

const trackerConfig = {
  name: 'tracker',
  url: '/tracker',
  component: trackerComponentName,
  data: {
    authRequired: true,
  },
};

export default [trackerConfig];