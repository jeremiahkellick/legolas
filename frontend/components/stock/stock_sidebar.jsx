import React from 'react';
import StockForm from './stock_form';

const StockSidebar = ({ stock }) => (
  <div className="sidebar-container">
    <div className="sidebar">
      <StockForm stock={stock} />
    </div>
  </div>
);

export default StockSidebar;
