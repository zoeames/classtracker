import React from 'react';

import './ClassSelector.scss';

import authRequests from '../../../helpers/data/authRequests';

class ClassSelector extends React.Component {
  githubAuth = () => {
    authRequests
      .authenticate()
      .then(() => {
        this.props.history.push('/calendar');
      })
      .catch(err => console.error('error in authenticate', err));
  };

  render() {
    return (
      <div className="ClassSelector">
        <div className="row">
          <div className="col-3 offset-3">
            <a className="btn btn-primary btn-lg btn-block" href="https://e10classtracker.zoeames.com">E10</a>
          </div>
          <div className="col-3">
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.githubAuth}>E11</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassSelector;
