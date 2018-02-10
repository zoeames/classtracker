
import { studentsComponentName } from './students.component';

const studentsConfig = {
  name: 'students',
  url: '/students',
  component: studentsComponentName,
  data: {
    authRequired: true,
  },
};

export default [studentsConfig];