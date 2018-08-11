import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import authRequests from '../../firebaseRequests/auth';
import './Navbar.css';

class Navbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    runAway: PropTypes.func,
  };

  githubAuth = () => {
    authRequests
      .authenticateGithub()
      .then(result => {
        console.error('result', result);
        // if(result.user.uid){
        //   this.isAuth = true;
        // }
        // this.$state.go("assignments");
      })
      .catch(err => {
        console.error('error in authenticate', err);
      });
  }

  render() {
    const { authed, runAway } = this.props;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      runAway();
    };

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/students" className="navbar-brand mb-0 h1">
          ClassTracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {authed ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/tracker">
                  Tracker
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/submit">
                  Submit
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/students">
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Calendar">
                  Calendar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/assignments">
                  Assignments
                </Link>
              </li>
              <li>
                <button onClick={logoutClickEvent} className="btn btn-danger">
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" onClick={this.githubAuth}>
                  <i className="fab fa-github"></i> Login
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
