import * as APIUtil from '../util/watch_api_util';

export const WATCH_STOCK = 'WATCH_STOCK';
export const UNWATCH_STOCK = 'UNWATCH_STOCK';

export const watchStock = symbol => dispatch => (
  APIUtil.watchStock(symbol).then(() => dispatch({ type: WATCH_STOCK, symbol }))
);

export const unwatchStock = symbol => dispatch => (
  APIUtil.unwatchStock(symbol)
    .then(() => dispatch({ type: UNWATCH_STOCK, symbol}))
);
