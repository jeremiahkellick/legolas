import { RECEIVE_STOCK, STOCK_NOT_FOUND } from '../actions/stock';

const stocksReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_STOCK:
      return Object.assign({}, state, { [action.stock.symbol]: action.stock });
    case STOCK_NOT_FOUND:
      return Object.assign({}, state, { [action.symbol]: null });
    default:
      return state;
  }
};

export default stocksReducer;
