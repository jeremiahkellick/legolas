export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const receiveErrors = errors => ({ type: RECEIVE_ERRORS, errors });
export const receiveError = error => ({ type: RECEIVE_ERROR, error });
export const clearErrors = () => ({ type: CLEAR_ERRORS });
