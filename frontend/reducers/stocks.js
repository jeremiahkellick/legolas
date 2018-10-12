import { RECEIVE_STOCK, STOCK_NOT_FOUND } from '../actions/stock';
import merge from 'lodash/merge';

const stocksReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_STOCK:
      return merge({}, state, { [action.stock.symbol]: action.stock });
    case STOCK_NOT_FOUND:
      return merge({}, state, { [action.symbol]: null });
    default:
      return state;
  }
};

export default stocksReducer;
