class NavbarController {
  constructor() {
    'ngInject';

    this.testData = 'Navbar';
  }

  auth(){
    console.log('you hit auth');
  }

  logout(){
    console.log('you hit logout');
  }
}

export default NavbarController;