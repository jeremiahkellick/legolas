import { RECEIVE_STOCK, STOCK_NOT_FOUND } from '../actions/stock';
import { RECEIVE_CHARTS } from '../actions/chart';
import merge from 'lodash/merge';

const upcaseSymbols = stocks => {
  const upcasedStocks = {};
  Object.keys(stocks).forEach(key => {
    upcasedStocks[key.toUpperCase()] = stocks[key];
  });
  return upcasedStocks;
};

const stocksReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_STOCK:
      return merge({}, state, { [action.stock.symbol]: action.stock });
    case STOCK_NOT_FOUND:
      return merge({}, state, { [action.symbol]: null });
    case RECEIVE_CHARTS:
      return merge({}, state, upcaseSymbols(action.stocks));
    default:
      return state;
  }
};

export default stocksReducer;
