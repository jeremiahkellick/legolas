import { combineReducers } from 'redux';
import errorsReducer from './errors';

const rootReducer = combineReducers({ errors: errorsReducer });

export default rootReducer;
