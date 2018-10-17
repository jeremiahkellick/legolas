import React from 'react';
import StockIndexItem from './stock_index_item';

const StockIndex = ({ stocks, sharesOf }) => {
  return (
    <ul className="stocks">
      { stocks.map(stock =>
        <StockIndexItem
          stock={stock}
          shares={sharesOf && sharesOf[stock.symbol]}
          key={stock.symbol} />
      ) }
    </ul>
  );
};

export default StockIndex;
