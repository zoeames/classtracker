
import { assignmentTrackerComponentName } from './assignment_tracker.component';

const assignmentTrackerConfig = {
  name: 'assignment_tracker',
  url: '/tracker',
  component: assignmentTrackerComponentName,
  data: {
    authRequired: true,
  },
};

export default [assignmentTrackerConfig];