import React from 'react';
import Graph from './graph';
import { formatMoney } from '../../util/util';

const StockMain = ({ stock }) => (
  <div className="stock-main">
    <h1>{stock.companyName}</h1>
    <h1 className="price">
      <span id="price">{formatMoney(stock.priceCents / 100)}</span>
      <span id="hover-price"></span>
    </h1>
    <Graph data={stock} />
    <h2>About</h2>
    <p>{stock.description}</p>
  </div>
);

export default StockMain;
