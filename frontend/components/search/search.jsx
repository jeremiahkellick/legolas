import React from 'react';
import symbols from './symbols.json';
import SearchSVG from './search_svg';
import Match from './match';
import { Link, withRouter } from 'react-router-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { query: '', results: [] };
  }

  handleInputChange(e) {
    this.updateQuery(e.target.value);
  }

  updateQuery(query) {
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
    const target = e.currentTarget;
    setTimeout(() => target.classList.remove('focus'), 100);
  }

  handleSubmit(e) {
    e.preventDefault();
    const results = this.state.results;
    if (results.length > 0) {
      this.props.history.push(`/stocks/${results[0].symbol.toLowerCase()}`);
      this.updateQuery('');
    }
  }

  render () {
    const results = this.state.results;
    const query = this.state.query;
    return (
      <div onFocus={this.focus} onBlur={this.blur} className="search-bar">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleInputChange}
            value={query}
            placeholder="Search" />
        </form>
        <SearchSVG />
        {
          results.length > 0 &&
          <ul>
            <h4>Stocks</h4>
            { results.slice(0, 10).map(result =>
              <li key={result.symbol}>
                <Link
                  onClick={() => this.updateQuery('')}
                  to={`/stocks/${result.symbol.toLowerCase()}`}>

                  <span className="symbol">
                    <Match string={result.symbol} query={query} />
                  </span>
                  <Match string={result.name} query={query} />
                </Link>
              </li>
            ) }
          </ul>
        }
      </div>
    );
  }
}

export default withRouter(Search);
