import React from 'react';
import Graph from './graph';

const StockMain = ({ stock }) => (
  <div className="stock-main">
    <h1>{stock.companyName}</h1>
    <Graph data={stock} />
    <h2>About</h2>
    <p>{stock.description}</p>
  </div>
);

export default StockMain;
