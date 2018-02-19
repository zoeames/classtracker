import * as firebase from 'firebase';

function appRun($transitions, FIREBASE_CONFIG) {
  'ngInject';

  firebase.initializeApp(FIREBASE_CONFIG);
  const matchState = {
    to(state) {
      return state.data && state.data.authRequired === true;
    },
  };

  $transitions.onBefore(matchState, (transition) => {
    const authService = transition.injector().get('authService');
    if (authService.isAuthenticated) { return true; }

    const $state = transition.router.stateService;
    const redirectTo = transition.$to().name;
    const redirectParams = transition.params();

    return $state.target('assignments').withParams({
      redirectTo,
      redirectParams,
    });
  });
}

export default appRun;
