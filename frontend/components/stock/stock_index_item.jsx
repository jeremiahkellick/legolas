import React from 'react';
import { formatMoney } from '../../util/util';
import SmallGraph from './small_graph';
import { Link } from 'react-router-dom';
import Loader from '../loader';

const StockIndexItem = ({ stock, shares }) => {
  if (stock["1D"] === undefined
      || !stock["1D"].points
      || !stock["1D"].points[0]
  ) {
    return (
      <li>
        <Link to={`/stocks/${stock.symbol.toLowerCase()}`}>
          <Loader />
        </Link>
      </li>
    );
  }
  return (
    <li>
      <Link to={`/stocks/${stock.symbol.toLowerCase()}`}>
        <div>
          <h4>{stock.symbol}</h4>
          {shares && <div className="shares">{shares} shares</div>}
        </div>
        <SmallGraph stock={stock} />
        <div className="price-preview">
          {formatMoney(stock.priceCents / 100)}
        </div>
      </Link>
    </li>
  );
};

export default StockIndexItem;
