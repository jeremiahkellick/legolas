import React from 'react';
import LogInFormContainer from './log_in_form_container';

const LogInPage = props => (
  <div className="log-in">
    <div className="image"></div>
    <div className="form-half">
      <section>
        <h1>Welcome to Legolas</h1>
        <LogInFormContainer />
      </section>
    </div>
  </div>
);

export default LogInPage;
