import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connection';

import Auth from '../components/components/Auth/Auth';
import MyNavBar from '../components/components/MyNavbar/MyNavbar';
import './App.scss';
import authRequests from '../helpers/data/authRequests';

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const { authed } = this.state;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (!authed) {
      return (
        <div className="App">
          <MyNavBar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
          <Auth isAuthenticated={this.isAuthenticated} />
        </div>
      );
    }
    return (
      <div className="App">
        <MyNavBar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
        You are authenticated.
      </div>
    );
  }
}

export default App;
