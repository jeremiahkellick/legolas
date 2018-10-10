export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_ERROR = 'RECIEVE_ERROR';
export const CLEAR_ERRORS = 'RECEIVE_ERRORS';

export const receiveErrors = errors => {
  if (errors instanceof Array) {
    return { type: RECEIVE_ERRORS, errors };
  } else {
    const errorsArr = Object.keys(errors).map(key => `${key} ${errors[key]}`);
    return { type: RECEIVE_ERRORS, errors: errorsArr };
  }
};

export const receiveError = error => ({ type: RECEIVE_ERROR, error });
export const clearErrors = () => ({ type: CLEAR_ERRORS });
