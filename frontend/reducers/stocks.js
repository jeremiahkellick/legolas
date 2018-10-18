import { RECEIVE_STOCK, STOCK_NOT_FOUND } from '../actions/stock';
import { RECEIVE_CHARTS } from '../actions/chart';
import merge from 'lodash/merge';
import { mergeStocks, mergeStockHashes } from '../util/util';

const upcaseSymbols = stocks => {
  const upcasedStocks = {};
  Object.keys(stocks).forEach(key => {
    upcasedStocks[key.toUpperCase()] = stocks[key];
  });
  return upcasedStocks;
};

const stocksReducer = (state = {}, action) => {
  const merger = merge;
  const mergeHashes = mergeStockHashes;
  switch (action.type) {
    case RECEIVE_STOCK:
      const oldStock = state[action.stock.symbol];
      return merge(
        {},
        state,
        { [action.stock.symbol]: mergeStocks(oldStock, action.stock) }
      );
    case STOCK_NOT_FOUND:
      return merge({}, state, { [action.symbol]: null });
    case RECEIVE_CHARTS:
      return merge({}, mergeStockHashes(merge({}, state), action.stocks));
    default:
      return state;
  }
};

export default stocksReducer;
