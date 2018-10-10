import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ loggedIn, exact, path, component: Component }) => (
  <Route exact={exact} path={path} render={props => (
    loggedIn ? (
      <Redirect to="/" />
    ) : (
      <Component {...props} />
    )
  )} />
);

const Protected = ({
  loggedIn,
  exact,
  path,
  component: Component
}) => (
  <Route exact={exact} path={path} render={props => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const LoggedIn = ({ loggedIn, component: Component }) => (
  loggedIn ? <Component /> : ""
);

const LoggedOut = ({ loggedIn, component: Component }) => (
  loggedIn ? "" : <Component />
);

const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser)
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const RenderIfLoggedIn = connect(mapStateToProps)(LoggedIn);
export const RenderIfLoggedOut = connect(mapStateToProps)(LoggedOut);
