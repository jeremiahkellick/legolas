import React from 'react';
import SignUpFormContainer from './sign_up_form_container';

const SignUpPage = props => (
  <div className="sign-up">
    <section className="sign-up-form">
      <h1>Make Your Money Move</h1>
      <p>
        Robinhood lets you invest in companies you love, commission-free.
      </p>
      <SignUpFormContainer />
    </section>
    <section className="sidebar"></section>
  </div>
);

export default SignUpPage;
