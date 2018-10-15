import { RECEIVE_CURRENT_USER, LOG_OUT } from '../actions/session';
import merge from 'lodash/merge';

const _nullSession = { currentUser: { sharesOf: {} } };

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
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      upcaseSharesOfKeys(action.currentUser);
      return merge({}, state, { currentUser: action.currentUser });
    case LOG_OUT:
      return _nullSession;
    default:
      return state;
  }
};

export default sessionReducer;
