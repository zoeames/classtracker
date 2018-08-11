import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase';

import Navbar from '../components/Navbar/Navbar';
import Students from '../pages/Students/Students';
// import Tracker from '../pages/Tracker/Tracker';
import Assignments from '../pages/Assignments/Assignments';
import Calendar from '../pages/Calendar/Calendar';
import SingleStudent from '../pages/SingleStudent/SingleStudent';
import Submit from '../pages/Submit/Submit';

import './App.css';

import fbConection from '../firebaseRequests/connection';
fbConection();

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    // renders a route and passes in all the props (...rest is all the other props)
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

// const PrivateAdminRoute = ({ component: Component, authed, ...rest }) => {
//   return (
//     // renders a route and passes in all the props (...rest is all the other props)
//     <Route
//       {...rest}
//       render={props =>
//         authed === true ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: '/login', state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// };

class App extends Component {
  state = {
    authed: false,
    loading: false,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  runAway = () => {
    this.setState({
      authed: false,
      loading: false,
    });
  }

  render() {
    return this.state.loading === true ? (
      <h1>Loading</h1>
    ) : (
      <BrowserRouter>
        <div className="App">
          <Navbar
            authed={this.state.authed}
            runAway={this.runAway}
          />
          <div className="body-container">
            <Switch>
              <Route path="/students" exact component={Students} />
              <Route path="/assignments" exact component={Assignments} />
              <Route path="/calendar" exact component={Calendar} />
              <PrivateRoute
                authed={this.state.authed}
                path="/student/:id"
                component={SingleStudent}
              />
              <PrivateRoute
                authed={this.state.authed}
                path="/submit"
                component={Submit}
              />
              {/* <PrivateAdminRoute
                authed={this.state.authed}
                admin={this.state.admin}
                path="/tracker"
                component={Tracker}
              /> */}
              <Redirect from="*" to="/students"/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
