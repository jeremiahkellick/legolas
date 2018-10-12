import * as APIUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const STOCK_NOT_FOUND = 'STOCK_NOT_FOUND';

export const receiveStock = stock => ({ type: RECEIVE_STOCK, stock });
export const stockNotFound = symbol => ({ type: STOCK_NOT_FOUND, symbol });

export const fetchStock = symbol => dispatch => (
  APIUtil.fetchStock(symbol).then(
    stock => dispatch(receiveStock(stock)),
    () => dispatch(stockNotFound(symbol))
  )
);
