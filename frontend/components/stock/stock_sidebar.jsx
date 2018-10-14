import React from 'react';
import StockForm from './stock_form';

const StockSidebar = ({ stock }) => (
  <div className="sidebar-container">
    <div className="stock-sidebar">
      <h3>Buy {stock.symbol}</h3>
      <StockForm stock={stock} />
    </div>
  </div>
);

export default StockSidebar;
