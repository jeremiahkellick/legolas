import React from 'react';
import { Link } from 'react-router-dom';
import LogoSVG from './logo_svg';

const Logo = props => (
  <Link className="logo" to="/"><LogoSVG /></Link>
);

export default Logo;
