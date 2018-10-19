import React from 'react';
import SignUpFormContainer from './sign_up_form_container';
import timeImage from '../../../app/assets/images/time.jpg';
import Videos from './videos';

const SignUpPage = props => {
  document.body.classList.remove('red');
  return (
    <div className="sign-up">
      <section className="sign-up-form">
        <h1>Make Your Money Move</h1>
        <p>
          Legolas lets you invest in companies you love, commission-free.
        </p>
        <SignUpFormContainer />
      </section>
      <Videos />
    </div>
  );
};

export default SignUpPage;
