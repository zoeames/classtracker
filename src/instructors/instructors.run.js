function setInstructorsRedirects($transitions) {
  'ngInject';

  const matchState = {
    to(state) {
      return state.data && state.data.instructorsRequired;
    },
  };

  $transitions.onBefore(matchState, (transition) => {
    const authService = transition.injector().get('authService');
    if (authService.isInstructor()) { return true; }

    const $state = transition.router.stateService;
    const redirectTo = transition.$to().name;
    const redirectParams = transition.params();

    return $state.target('assignments').withParams({
      redirectTo,
      redirectParams,
    });
  });
}

export default setInstructorsRedirects;