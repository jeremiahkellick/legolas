import React from 'react';
import SignUpFormContainer from './sign_up_form_container';
import timeImage from '../../../app/assets/images/time.jpg';

const SignUpPage = props => (
  <div className="sign-up">
    <section className="sign-up-form">
      <h1>Make Your Money Move</h1>
      <p>
        Robinhood lets you invest in companies you love, commission-free.
      </p>
      <SignUpFormContainer />
    </section>
    <section className="sidebar">
      <img class="time-image" src={timeImage} />
      <p class="slide-title">
        Stay on top of your portfolio.<br /> Anytime. Anywhere.
      </p>
      <p class="slide-text">
        Fast execution, real-time market data, and smart notifications help you
        make the most of the stock market no matter where you are.
      </p>
    </section>
  </div>
);

export default SignUpPage;
