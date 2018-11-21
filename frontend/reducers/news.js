import { RECEIVE_NEWS } from '../actions/news';
import merge from 'lodash/merge';

const newsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_NEWS:
      const articlesWithImages = action.news.filter(article =>
        article.urlToImage !== null
      );
      return merge({}, state, { [action.symbol]: articlesWithImages });
    default:
      return state;
  }
};

export default newsReducer;
