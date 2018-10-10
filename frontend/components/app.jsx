import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { AuthRoute, RenderIfLoggedIn } from '../util/session_util';
import Logo from './logo/logo';
import Search from './search/search';
import Nav from './nav';
import SignUpPage from './user/sign_up_page';
import ErrorsCleanerContainer from './errors_cleaner/errors_cleaner_container';

const App = props => (
  <div className="app">
    <header>
      <Logo />
      <RenderIfLoggedIn component={Search} />
      <Nav />
    </header>
    <main>
      <ErrorsCleanerContainer />
      <Route exact path="/" render={() => <h1>Welcome to Legolas</h1>} />
      <AuthRoute path="/sign_up" component={SignUpPage} />
    </main>
  </div>
);

export default App;
