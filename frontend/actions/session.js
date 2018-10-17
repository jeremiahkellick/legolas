import * as APIUtil from '../util/session_api_util';
import { receiveError } from './error';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOG_OUT = 'LOG_OUT';

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: user
});

export const frontendLogOut = () => ({ type: LOG_OUT });

export const logIn = user => dispatch => (
  APIUtil.logIn(user).then(
    user => dispatch(receiveCurrentUser(user)),
    res => dispatch(receiveError(res.responseText))
  )
);

export const logOut = user => dispatch => (
  APIUtil.logOut().then(
    () => dispatch(frontendLogOut()),
    res => dispatch(receiveError(res.responseText))
  )
);
