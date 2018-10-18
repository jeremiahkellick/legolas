import { RECEIVE_CURRENT_USER, LOG_OUT } from '../actions/session';
import { RECEIVE_CHARTS } from '../actions/chart';
import { WATCH_STOCK, UNWATCH_STOCK } from '../actions/watch';
import merge from 'lodash/merge';
import { mergeStocks } from '../util/util';

const _nullSession = { currentUser: { sharesOf: {}, charts: {} } };

const upcaseSharesOfKeys = (user) => {
  if (user.sharesOf !== undefined) {
    Object.keys(user.sharesOf).forEach(key => {
      if (key !== key.toUpperCase()) {
        user.sharesOf[key.toUpperCase()] = user.sharesOf[key];
        delete user.sharesOf[key];
      }
    });
  }
  return user;
};

const sessionReducer = (state = _nullSession, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      upcaseSharesOfKeys(action.currentUser);
      return merge({}, state, { currentUser: action.currentUser });
    case RECEIVE_CHARTS:
      upcaseSharesOfKeys(action.currentUser);
      const newCharts = mergeStocks(
        merge({}, state.currentUser.charts),
        action.currentUser.charts,
        true
      );
      return merge({}, state, { currentUser: { charts: newCharts } });
    case LOG_OUT:
      return _nullSession;
    case WATCH_STOCK:
      newState = merge({}, state);
      newState.currentUser.watchedStocks.push(action.symbol);
      return newState;
    case UNWATCH_STOCK:
      newState = merge({}, state);
      let index = newState.currentUser.watchedStocks.indexOf(action.symbol);
      if (index !== -1) newState.currentUser.watchedStocks.splice(index, 1);
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
