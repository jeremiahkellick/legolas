import React from 'react';
import { withRouter } from 'react-router-dom';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.user;
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorsHTML = this.errorsHTML.bind(this);
    this.nameHTML = this.nameHTML.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
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
      </form>
    );
  }
}

export default withRouter(UserForm);
