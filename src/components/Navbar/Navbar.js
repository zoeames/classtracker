import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import authRequests from '../../firebaseRequests/auth';
import './Navbar.css';

class Navbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    admin: PropTypes.bool,
    runAway: PropTypes.func,
    setStudent: PropTypes.func,
  };

  githubAuth = () => {
    authRequests
      .authenticateGithub()
      .then(result => {
        this.props.setStudent(result);
      })
      .catch(err => {
        console.error('error in authenticate', err);
      });
  };

  logoutClickEvent = () => {
    authRequests.logoutUser();
    this.props.runAway();
  };

  render() {
    const { admin, authed } = this.props;

    const buildNavbar = () => {
      if (admin) {
        return (
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
              <button onClick={this.logoutClickEvent} className="btn btn-danger">
                Logout
              </button>
            </li>
          </ul>
        );
      } else if (authed) {
        return (
          <ul className="navbar-nav ml-auto">
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
              <button onClick={this.logoutClickEvent} className="btn btn-danger">
                Logout
              </button>
            </li>
          </ul>
        );
      } else {
        return (
          <ul className="navbar-nav ml-auto">
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
            <li className="nav-item">
              <a className="nav-link" onClick={this.githubAuth}>
                <i className="fab fa-github" /> Login
              </a>
            </li>
          </ul>
        );
      }
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
          {buildNavbar()}
        </div>
      </nav>
    );
  }
}

export default Navbar;
