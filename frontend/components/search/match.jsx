import React from 'react';

class Match extends React.Component {
  render () {
    let { string, query } = this.props;
    if (string.length > 50) {
      string = string.slice(0, 47) + '...';
    }
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
