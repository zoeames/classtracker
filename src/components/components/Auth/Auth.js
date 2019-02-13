import React from 'react';
import PropTypes from 'prop-types';
import './Auth.scss';
import authRequests from '../../../helpers/data/authRequests';

class Auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  };

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests
      .authenticate()
      .then(() => {
        this.props.isAuthenticated();
      })
      .catch(err => console.error('error in auth', err));
  };

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-danger" onClick={this.authenticateUser}>
          Github
        </button>
      </div>
    );
  }
}

export default Auth;
