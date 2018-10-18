import React from 'react';
import { connect } from 'react-redux';
import StockIndex from './stock_index';
import { fetchStock } from '../../actions/stock';

class WatchedStocks extends React.Component {
  componentDidMount() {
    this.watchedAndNotOwned().forEach(symbol => this.props.fetchStock(symbol));
  }

  componentDidUpdate(prevProps) {
    this.props.watchedStocks.forEach(symbol => {
      if (!prevProps.watchedStocks.includes(symbol)) {
        this.props.fetchStock(symbol);
      }
    });
  }

  watchedAndNotOwned() {
    const { watchedStocks, owned } = this.props;
    const watchedAndNotOwned = [];
    this.props.watchedStocks.forEach(symbol => {
      if (!owned.includes(symbol)) watchedAndNotOwned.push(symbol);
    });
    return watchedAndNotOwned;
  }

  render () {
    const { watchedStocks, allStocks, owned } = this.props;
    if (watchedStocks === undefined || this.watchedAndNotOwned().length === 0) {
      return '';
    }
    return (
      <div>
        <h3><div>Watchlist</div></h3>
        <StockIndex stocks={this.watchedAndNotOwned().map(symbol =>
          allStocks[symbol] ? allStocks[symbol] : { symbol }
        )} />
      </div>
    );
  }
}

const ownedStockSymbols = sharesOf => (
  Object.keys(sharesOf).filter(symbol => sharesOf[symbol] > 0)
);

const mapStateToProps = state => ({
  watchedStocks: state.session.currentUser.watchedStocks,
  allStocks: state.stocks,
  owned: ownedStockSymbols(state.session.currentUser.sharesOf)
});

export default connect(mapStateToProps, { fetchStock })(WatchedStocks);
