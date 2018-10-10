import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logOut } from '../../actions/session';

class LogOutLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.logOut().then(() => this.props.history.push("/"));
  }

  render () {
    return <a onClick={this.handleClick}>Log Out</a>;
  }
}

export default connect(null, { logOut })(withRouter(LogOutLink));
