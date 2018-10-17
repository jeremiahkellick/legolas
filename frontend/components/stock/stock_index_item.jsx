import React from 'react';
import { formatMoney } from '../../util/util';
import SmallGraph from './small_graph';
import { Link } from 'react-router-dom';

const StockIndexItem = ({ stock, shares }) => (
  <li>
    <Link to={`/stocks/${stock.symbol.toLowerCase()}`}>
      <div>
        <h4>{stock.symbol}</h4>
        {shares && <div className="shares">{shares} shares</div>}
      </div>
      <SmallGraph stock={stock} />
      <div className="price-preview">{formatMoney(stock.priceCents / 100)}</div>
    </Link>
  </li>
);

export default StockIndexItem;
