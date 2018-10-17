import React from 'react';
import Graph from '../graph';
import { formatMoney } from '../../util/util';
import News from '../news/news';
import Loader from '../loader';

const StockMain = ({ stock }) => (
  <div className="main">
    <h1>{stock.companyName || <Loader />}</h1>
    <Graph data={stock} />
    {
      stock.description ? (
        <section>
          <h2>About</h2>
          <p>{stock.description}</p>
        </section>
      ) : <section><Loader /></section>
    }
    <section>
      <h2>News</h2>
      <News symbol={stock.symbol} />
    </section>
  </div>
);

export default StockMain;
