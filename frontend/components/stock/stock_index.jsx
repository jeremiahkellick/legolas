import React from 'react';
import StockIndexItem from './stock_index_item';

const StockIndex = ({ stocks, sharesOf }) => (
  <ul className="stocks">
    { stocks.map(stock =>
      stock === undefined ? (
        ''
      ) : (
        <StockIndexItem
          stock={stock}
          shares={sharesOf === undefined ? undefined : sharesOf[stock.symbol]}
          key={stock.symbol} />
      )
    ) }
  </ul>
);

export default StockIndex;
