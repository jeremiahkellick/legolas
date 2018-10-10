import { combineReducers } from 'redux';
import errorsReducer from './errors';
import sessionReducer from './session';

const rootReducer = combineReducers({
  errors: errorsReducer,
  session: sessionReducer
});

export default rootReducer;
