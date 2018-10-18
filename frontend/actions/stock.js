import * as APIUtil from '../util/stock_api_util';
import { receiveCurrentUser } from './session';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const STOCK_NOT_FOUND = 'STOCK_NOT_FOUND';

export const receiveStock = stock => ({ type: RECEIVE_STOCK, stock });
export const stockNotFound = symbol => ({ type: STOCK_NOT_FOUND, symbol });

export const fetchStock = symbol => dispatch => (
  APIUtil.fetchStock(symbol).then(
    res => {
      dispatch(receiveStock(res.stock));
      dispatch(receiveCurrentUser(res.currentUser));
    },
    () => dispatch(stockNotFound(symbol))
  )
);

export const fetchWeekChart = symbol => dispatch => (
  APIUtil.fetchWeekChart(symbol).then(stock => dispatch(receiveStock(stock)))
);
