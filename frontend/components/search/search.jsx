import React from 'react';
import SearchSVG from './search_svg';

const Search = props => (
  <div className="search-bar">
    <input type="text" placeholder="Search" />
    <SearchSVG />
  </div>
);

export default Search;
