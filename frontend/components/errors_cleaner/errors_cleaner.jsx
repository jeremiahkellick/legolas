import React from 'react';
import { withRouter } from 'react-router-dom';

class ErrorsCleaner extends React.Component {
  componentDidMount() {
    this.unlisten = this.props.history.listen(() => {
      this.props.clearErrors();
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render () {
    return "";
  }
}

export default withRouter(ErrorsCleaner);
