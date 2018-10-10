import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logOut } from '../../actions/session';

class LogOutButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.logOut().then(() => this.props.history.push("/"));
  }

  render () {
    return <button onClick={this.handleClick}>Log Out</button>;
  }
}

export default connect(null, { logOut })(withRouter(LogOutButton));
