import React from 'react';

class ThemeToggle extends React.Component {
  constructor(props) {
    super(props);
    if (document.body.classList.contains('dark')) {
      this.state = { text: 'Light Mode' };
    } else {
      this.state = { text: 'Dark Mode' };
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.preventDefault();
    document.body.classList.toggle('dark');
    const deleteExpireDate = ' expires=Tue, 20 Jul 1999 12:00:00 UTC;';
    if (document.body.classList.contains('dark')) {
      document.cookie = 'theme=dark; path=/;';
      this.setState({ text: 'Light Mode' });
    } else {
      document.cookie = 'theme=;' + deleteExpireDate;
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
