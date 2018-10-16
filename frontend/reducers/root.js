import { combineReducers } from 'redux';
import errorsReducer from './errors';
import sessionReducer from './session';
import stocksReducer from './stocks';
import newsReducer from './news';

const rootReducer = combineReducers({
  errors: errorsReducer,
  session: sessionReducer,
  stocks: stocksReducer,
  news: newsReducer
});

export default rootReducer;
