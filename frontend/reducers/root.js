import { combineReducers } from 'redux';
import errorsReducer from './errors';
import sessionReducer from './session';
import stocksReducer from './stocks';

const rootReducer = combineReducers({
  errors: errorsReducer,
  session: sessionReducer,
  stocks: stocksReducer
});

export default rootReducer;
