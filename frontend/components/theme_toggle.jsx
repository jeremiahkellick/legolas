import React from 'react';

class ThemeToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Dark Mode' };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.preventDefault();
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      this.setState({ text: 'Light Mode' });
    } else {
      this.setState({ text: 'Dark Mode' });
    }
  }

  render () {
    return (
      <a onClick={this.toggle}>{this.state.text}</a>
    );
  }
}

export default ThemeToggle;
