import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/students" className="navbar-brand mb-0 h1">ClassTracker</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/students">Students</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
