import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loader = props => {
  const darkMode = document.body.classList.contains('dark');
  return (
    <BeatLoader
      className="stock-loader"
      color={darkMode ? '#ffffff' : '#171718'} />
  );
};

export default Loader;
