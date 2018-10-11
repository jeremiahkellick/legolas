import { RECEIVE_CURRENT_USER, LOG_OUT } from '../actions/session';

const _nullSession = { currentUser: null };

const sessionReducer = (state = _nullSession, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { currentUser: action.currentUser });
    case LOG_OUT:
      return _nullSession;
    default:
      return state;
  }
};

export default sessionReducer;
