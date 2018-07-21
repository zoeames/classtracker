import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
// import firebase from 'firebase';

import Students from '../pages/Students/Students';
import Navbar from '../components/Navbar/Navbar';

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
              <Redirect from="*" to="/students"/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
