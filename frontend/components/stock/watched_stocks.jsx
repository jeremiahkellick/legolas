import React from 'react';
import { connect } from 'react-redux';
import StockIndex from './stock_index';
import { fetchStock } from '../../actions/stock';

class WatchedStocks extends React.Component {
  componentDidMount() {
    this.props.watchedStocks.forEach(symbol => this.props.fetchStock(symbol));
  }

  componentDidUpdate(prevProps) {
    this.props.watchedStocks.forEach(symbol => {
      if (!prevProps.watchedStocks.includes(symbol)) {
        this.props.fetchStock(symbol);
      }
    });
  }
  
  render () {
    const { watchedStocks, allStocks } = this.props;
    if (watchedStocks === undefined) return '';
    return (
      <StockIndex stocks={watchedStocks.map(symbol => allStocks[symbol])} />
    );
  }
}

const mapStateToProps = state => ({
  watchedStocks: state.session.currentUser.watchedStocks,
  allStocks: state.stocks
});

export default connect(mapStateToProps, { fetchStock })(WatchedStocks);
