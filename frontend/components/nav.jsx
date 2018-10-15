import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutLink from './session/log_out_link';
import ThemeToggle from './theme_toggle';

const Nav = ({ loggedIn }) => (
  <nav>
    {
      loggedIn ? (
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><ThemeToggle /></li>
          <li><LogOutLink /></li>
        </ul>
      ) : (
        <ul>
          <li><Link to="/log_in">Log In</Link></li>
          <li><Link to="/sign_up">Sign Up</Link></li>
          <li><ThemeToggle /></li>
        </ul>
      )
    }
  </nav>
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser.id)
});

export default connect(mapStateToProps)(Nav);
