import React from 'react';
import { connect } from 'react-redux';
import { watchStock, unwatchStock } from '../../actions/watch';

class WatchButton extends React.Component {
  handleClick(e) {
    e.preventDefault();
    if (this.props.watched) {
      this.props.unwatchStock(this.props.symbol);
    } else {
      this.props.watchStock(this.props.symbol);
    }
  }

  render () {
    const action = this.props.watched ? "Remove from" : "Add to";
    return (
      <button onClick={this.handleClick.bind(this)} className="watch-button">
        {action} Watchlsit
      </button>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  watched: state.session.currentUser.watchedStocks.includes(ownProps.symbol)
});

const mapDispatchToProps = { watchStock, unwatchStock };

export default connect(mapStateToProps, mapDispatchToProps)(WatchButton);
