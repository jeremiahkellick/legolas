import React from 'react';

const ErrorSVG = props => (
  <svg
    className="error-svg"
    width="16"
    height="16"
    viewBox="0 0 16 16">

    <g fillRule="evenodd" transform="translate(0 -2)">
      <circle cx="8" cy="10" r="8"></circle>
      <text
        fontFamily="Roboto"
        fontSize="11.5" fontWeight="700"
        letterSpacing=".048">

        <tspan x="6.229" y="14">!</tspan>
      </text>
    </g>
  </svg>
);

export default ErrorSVG;
