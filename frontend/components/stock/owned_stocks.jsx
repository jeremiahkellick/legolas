import React from 'react';
import { connect } from 'react-redux';
import StockIndex from './stock_index';

const OwnedStocks = ({ sharesOf, allStocks }) => {
  const stocks = [];
  const symbols = Object.keys(sharesOf).forEach(symbol => {
    if (sharesOf[symbol] > 0) stocks.push(allStocks[symbol] || { symbol });
  });
  return <StockIndex stocks={stocks} sharesOf={sharesOf} />;
};

const mapStateToProps = state => ({
  sharesOf: state.session.currentUser.sharesOf,
  allStocks: state.stocks
});

export default connect(mapStateToProps)(OwnedStocks);
