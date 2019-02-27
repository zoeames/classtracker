import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './MyNavbar.scss';

import authRequests from '../../../helpers/data/authRequests';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    admin: PropTypes.bool,
    runAway: PropTypes.func,
    setStudent: PropTypes.func,
  };

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  githubAuth = () => {
    authRequests
      .authenticate()
      .then((result) => {
        this.props.setStudent(result);
      })
      .catch(err => console.error('error in authenticate', err));
  };

  logoutClickEvent = (e) => {
    e.preventDefault();
    authRequests.logoutUser();
    this.props.runAway();
  }

  render() {
    const { authed, admin } = this.props;
    const buildNavbar = () => {
      if (admin) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={ Link } to='/tracker'>Tracker</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ Link } to='/submit'>Submit</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ Link } to='/students'>Student</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ Link } to='/calendar'>Calendar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ Link } to='/assignments'>Assignments</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.logoutClickEvent}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={ Link } to='/submit'>Submit</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ Link } to='/students'>Student</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ Link } to='/calendar'>Calendar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ Link } to='/assignments'>Assignments</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.logoutClickEvent}>Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={ Link } to='/students'>Student</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={ Link } to='/calendar'>Calendar</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={ Link } to='/assignments'>Assignments</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.githubAuth}>Login</NavLink>
          </NavItem>
        </Nav>
      );
    };

    return (
      <div className="my-navbar">
      <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">ClassTracker</NavbarBrand>
          <NavbarToggler onClick={e => this.toggle(e)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
