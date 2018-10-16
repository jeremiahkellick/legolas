import React from 'react';
import Graph from '../graph';
import { formatMoney } from '../../util/util';
import News from '../news/news';

const StockMain = ({ stock }) => (
  <div className="main">
    <h1>{stock.companyName}</h1>
    <Graph data={stock} />
    <section>
      <h2>About</h2>
      <p>{stock.description}</p>
    </section>
    <section>
      <h2>News</h2>
      <News symbol={stock.symbol} />
    </section>
  </div>
);

export default StockMain;
