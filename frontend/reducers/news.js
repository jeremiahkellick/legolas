import { RECEIVE_NEWS } from '../actions/news';
import merge from 'lodash/merge';

const newsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_NEWS:
      return merge({}, state, { [action.symbol]: action.news });
    default:
      return state;
  }
};

export default newsReducer;
