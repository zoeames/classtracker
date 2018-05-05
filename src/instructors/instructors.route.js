import instructorsParentTemplate from './instructors.html';

export const instructorsStateName = 'instructors';

export const instructorsParentRoutes = [{
  name: instructorsStateName,
  abstract: true,
  template: instructorsParentTemplate,
  data: {
    authRequired: true,
    instructorsRequired: true,
  },
}];
