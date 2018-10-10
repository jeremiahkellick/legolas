import React from 'react';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.user;
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitAction(this.state);
  }

  render () {
    const errors = this.props.errors;
    let errorsHTML = '';
    if (errors.length > 0) {
      errorsHTML = (
        <ul className="errors">
          { errors.map(error => <li key={error}>{error}</li>) }
        </ul>
      );
    }
    let nameHTML = '';
    if (this.props.includeName === true) {
      nameHTML = (
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
    return (
      <form onSubmit={this.handleSubmit}>
        { errorsHTML }
        { nameHTML }
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

export default UserForm;
