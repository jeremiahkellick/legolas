import React from 'react';
import StockIndexItem from './stock_index_item';
import { connect } from 'react-redux';

const StockIndex = ({ currentUser, stocks }) => {
  const symbols = Object.keys(currentUser.sharesOf).filter(symbol =>
    currentUser.sharesOf[symbol] > 0
  );
  return (
    <ul className="stocks">
      { symbols.map(symbol =>
        <StockIndexItem
          symbol={symbol}
          stock={stocks[symbol]}
          shares={currentUser.sharesOf[symbol]}
          key={symbol} />
      ) }
    </ul>
  );
};

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  stocks: state.stocks
});

export default connect(mapStateToProps)(StockIndex);
