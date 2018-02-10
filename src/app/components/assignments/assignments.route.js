import { assignmentsComponentName } from './assignments.component';

const assignmentsConfig = {
  name: 'assignments',
  url: '/assignments',
  component: assignmentsComponentName,
  data: {
    authRequired: true,
  },
};

export default [assignmentsConfig];