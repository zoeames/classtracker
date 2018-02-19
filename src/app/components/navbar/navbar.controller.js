class NavbarController {
  constructor($state, authService) {
    "ngInject";

    this.$state = $state;
    this.authService = authService;
    this.isAuth = this.authService.isAuthenticated;
  }

  auth() {
    console.log("you hit auth");
    this.authService
      .authenticateGithub()
      .then(result => {
        if(result.user.uid){
          this.isAuth = true;
        }
        this.$state.go("assignments");
      })
      .catch(err => {
        console.log("error in authenticate", err);
      });
  }

  logout() {
    this.isAuth = false;
    this.authService.logout()
  }
}

export default NavbarController;
