import React from 'react';
import LogInFormContainer from './log_in_form_container';

const LogInPage = props => {
  document.body.classList.remove('red');
  return (
    <div className="log-in">
      <div className="image"></div>
      <div className="form-half">
        <section class="hoverable-inputs">
          <h1>Welcome to Legolas</h1>
          <LogInFormContainer />
        </section>
      </div>
    </div>
  );
};

export default LogInPage;
