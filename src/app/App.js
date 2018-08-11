import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
// import firebase from 'firebase';

import Navbar from '../components/Navbar/Navbar';
import Students from '../pages/Students/Students';
import Tracker from '../pages/Tracker/Tracker';
import Assignments from '../pages/Assignments/Assignments';
import Calendar from '../pages/Calendar/Calendar';
import SingleStudent from '../pages/SingleStudent/SingleStudent';
import Submit from '../pages/Submit/Submit';

import './App.css';

class App extends Component {
  state = {
    loading: false,
  };

  render() {
    return this.state.loading === true ? (
      <h1>Loading</h1>
    ) : (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <div className="body-container">
            <Switch>
              <Route path="/students" exact component={Students} />
              <Route path="/tracker" exact component={Tracker} />
              <Route path="/assignments" exact component={Assignments} />
              <Route path="/calendar" exact component={Calendar} />
              <Route path="/student/:id" exact component={SingleStudent} />
              <Route path="/submit" exact component={Submit} />
              <Redirect from="*" to="/students"/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
