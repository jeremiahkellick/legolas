export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOG_OUT = 'LOG_OUT';

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: user
});

export const removeCurrentUser = () => ({ type: LOG_OUT });
