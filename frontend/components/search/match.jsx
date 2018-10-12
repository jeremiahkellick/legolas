import React from 'react';

class Match extends React.Component {
  render () {
    const { string, query } = this.props;
    let notMatching = string;
    let matching = '';
    if (string.toLowerCase().startsWith(query.toLowerCase())) {
      matching = string.slice(0, query.length);
      notMatching = string.slice(query.length);
    }
    return (
      <span><span className="matching">{matching}</span>{notMatching}</span>
    );
  }
}

export default Match;
