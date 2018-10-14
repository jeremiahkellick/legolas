import React from 'react';
import { Link } from 'react-router-dom';

const Splash = props => {
  document.body.classList.remove('red');
  return (
    <section className="splash">
      <div>
        <h1>Investing.<br /> Now for the rest of us.</h1>
        <p>Legolas lets you learn to invest in the stock market for free.</p>
        <Link className="button" to="/log_in">Log In</Link>
      </div>
    </section>
  );
};

export default Splash;
