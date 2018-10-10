import React from 'react';
import { withRouter } from 'react-router-dom';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.user;
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitThenRedirect = this.submitThenRedirect.bind(this);
    this.errorsHTML = this.errorsHTML.bind(this);
    this.nameHTML = this.nameHTML.bind(this);
    this.enterDemoCredentails = this.enterDemoCredentails.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.submitThenRedirect();
  }

  submitThenRedirect() {
    this.props.submitAction(this.state)
      .then(() => this.props.history.push("/"));
  }

  errorsHTML() {
    const errors = this.props.errors;
    if (errors.length === 0) return '';
    return (
      <ul className="errors">
        { errors.map(error => <li key={error}>{error}</li>) }
      </ul>
    );
  }

  nameHTML() {
    if (this.props.includeName === false) return '';
    return (
      <div className="names">
        <input
          type="text"
          placeholder="First name"
          value={this.state.firstName}
          onChange={this.update('firstName')} />
        <input
          type="text"
          placeholder="Last name"
          value={this.state.lastName}
          onChange={this.update('lastName')} />
      </div>
    );
  }

  enterDemoCredentails(e) {
    e.preventDefault();
    const chars = {};
    chars.email = 'demouser@example.com'.split('');
    chars.password = 'demouserpassword'.split('');
    const enterChar = (field) => {
      this.setState(
        { [field]: this.state[field] + chars[field].shift() },
        () => {
          if (chars[field].length > 0) {
            setTimeout(() => enterChar(field), 15);
          } else {
            if (field === 'email') {
              enterChar('password');
            } else {
              this.submitThenRedirect();
            }
          }
        }
      );
    };
    enterChar('email');
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        { this.errorsHTML() }
        { this.nameHTML() }
        <input
          type="email"
          placeholder="Email address"
          value={this.state.email}
          onChange={this.update('email')} />
        <input
          type="password"
          placeholder="Password (min. 10 characters)"
          value={this.state.password}
          onChange={this.update('password')} />
        <input type="submit" value={this.props.submitText} />
        <input type="submit" onClick={this.enterDemoCredentails} value="Demo"/>
      </form>
    );
  }
}

export default withRouter(UserForm);
