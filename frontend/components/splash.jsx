import React from 'react';
import { Link } from 'react-router-dom';
import laptopImage from '../../app/assets/images/laptop.png';

class Splash extends React.Component {
  componentDidMount() {
    setTimeout(() => $('.step-1').addClass('animated'), 100);
    setTimeout(() => $('.step-2').addClass('animated'), 800);
    setTimeout(() => $('.step-3').addClass('animated'), 1400);
    setTimeout(() => $('.step-4').addClass('animated'), 1800);
  }

  render () {
    document.body.classList.remove('red');
    return (
      <section className="splash">
        <div>
          <h1>
            <div className="step-1">Investing.</div>
            <div className="step-2">Now for the rest of us.</div>
          </h1>
          <p className="step-3">
            Legolas lets you learn to invest in the stock market for free.
          </p>
          <Link className="button step-4" to="/log_in">Log In</Link>
        </div>
        <div className="laptop-container">
          <img src={laptopImage} className="step-3 laptop" />
        </div>
      </section>
    );
  }
}

export default Splash;
