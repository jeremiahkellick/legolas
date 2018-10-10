import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ loggedIn }) => (
  <nav>
    {
      loggedIn ? (
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to="/log_in">Log In</Link></li>
          <li><Link to="/sign_up">Sign Up</Link></li>
        </ul>
      )
    }
  </nav>
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser)
});

export default Nav;
