
import { studentProgressComponentName } from './student_progress.component';

const studentProgressConfig = {
  name: 'student_progress',
  url: '/student/:id',
  component: studentProgressComponentName,
  data: {
    authRequired: true,
  },
};

export default [studentProgressConfig];