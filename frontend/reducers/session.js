import { RECEIVE_CURRENT_USER, LOG_OUT } from '../actions/session';
import merge from 'lodash/merge';

const _nullSession = { currentUser: null };

const sessionReducer = (state = _nullSession, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { currentUser: action.currentUser });
    case LOG_OUT:
      return _nullSession;
    default:
      return state;
  }
};

export default sessionReducer;
