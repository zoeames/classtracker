import React from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
  Redirect,
} from 'react-router-dom';
import firebase from 'firebase';

import Navbar from '../components/Navbar/Navbar';
import Students from '../pages/Students/Students';
import Tracker from '../pages/Tracker/Tracker';
import Assignments from '../pages/Assignments/Assignments';
import Calendar from '../pages/Calendar/Calendar';
import SingleStudent from '../pages/SingleStudent/SingleStudent';
import Submit from '../pages/Submit/Submit';

import './App.scss';

import studentRequests from '../firebaseRequests/students';
import fbConnection from '../firebaseRequests/connection';

const PrivateAdminRoute = ({ component: Component, admin, ...rest }) => {
  const routeChecker = props => (admin === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/assignments', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    admin: false,
    loading: false,
    student: {},
  };

  componentDidMount() {
    fbConnection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        studentRequests.getSingleStudent(user.uid)
          .then((fbStudent) => {
            this.setState({
              authed: true,
              loading: false,
              admin: !fbStudent.isStudent,
              student: fbStudent,
            });
          })
          .catch((err) => {
            console.error('error with user', err);
          });
      } else {
        this.setState({
          authed: false,
          loading: false,
          student: {},
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
      admin: false,
      loading: false,
      student: {},
    });
  }

  setStudent = (student) => {
    this.setState({ student });
  }

  render() {
    return this.state.loading === true ? (
      <h1>Loading</h1>
    ) : (
      <BrowserRouter>
        <div className="App">
          <Navbar
            authed={this.state.authed}
            admin={this.state.admin}
            runAway={this.runAway}
            setStudent={this.setStudent}
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
              <PrivateAdminRoute
                authed={this.state.authed}
                admin={this.state.admin}
                path="/tracker"
                component={Tracker}
              />
              <Redirect from="*" to="/students"/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
