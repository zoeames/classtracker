
import { submitComponentName } from './submit.component';

const submitConfig = {
  name: 'submit',
  url: '/submit',
  component: submitComponentName,
  data: {
    authRequired: true,
  },
};

export default [submitConfig];