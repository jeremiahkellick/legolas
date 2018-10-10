import { RECEIVE_ERRORS, RECEIVE_ERROR, CLEAR_ERRORS } from '../actions/error';

const errorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ERRORS:
      return [...action.errors];
    case RECEIVE_ERROR:
      return [action.error];
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};

export default errorsReducer;
