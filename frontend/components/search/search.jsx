import React from 'react';
import symbols from './symbols.json';
import SearchSVG from './search_svg';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
    this.state = { query: '', results: [] };
  }

  updateQuery(e) {
    const query = e.target.value;
    let results = [];
    if (query.length > 0) {
      results = symbols.filter(symbol =>
        this._matches(symbol.symbol, query) || this._matches(symbol.name, query)
      );
    }
    this.setState({ query, results });
  }

  _matches(string, query) {
    return string.toLowerCase().startsWith(query.toLowerCase());
  }

  focus(e) {
    e.currentTarget.classList.add('focus');
  }

  blur(e) {
    e.currentTarget.classList.remove('focus');
  }

  render () {
    const results = this.state.results;
    return (
      <div onFocus={this.focus} onBlur={this.blur} className="search-bar">
        <input type="text" onChange={this.updateQuery} placeholder="Search" />
        <SearchSVG />
        {
          results.length > 0 &&
          <ul>
            { results.slice(0, 10).map(result =>
              <li key={result.symbol}>{result.symbol} | {result.name}</li>
            ) }
          </ul>
        }
      </div>
    );
  }
}

export default Search;
