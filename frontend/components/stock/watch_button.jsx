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
    if (this.props.owned.includes(this.props.symbol)) return '';
    const action = this.props.watched ? "Remove from" : "Add to";
    return (
      <button onClick={this.handleClick.bind(this)} className="watch-button">
        {action} Watchlist
      </button>
    );
  }
}

const ownedStockSymbols = sharesOf => (
  Object.keys(sharesOf).filter(symbol => sharesOf[symbol] > 0)
);

const mapStateToProps = (state, ownProps) => ({
  watched: state.session.currentUser.watchedStocks.includes(ownProps.symbol),
  owned: ownedStockSymbols(state.session.currentUser.sharesOf)
});

const mapDispatchToProps = { watchStock, unwatchStock };

export default connect(mapStateToProps, mapDispatchToProps)(WatchButton);
