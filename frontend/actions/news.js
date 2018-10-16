import * as APIUtil from '../util/news_api_util';

export const RECEIVE_NEWS = 'RECEIVE_NEWS';

export const receiveNews = (news, symbol) => ({
  type: RECEIVE_NEWS,
  news,
  symbol
});

export const fetchNews = symbol => dispatch => (
  APIUtil.fetchNews(symbol).then(news => dispatch(receiveNews(news, symbol)))
);

export const fetchMarketNews = () => dispatch => (
  APIUtil.fetchNews('stock market')
    .then(news => dispatch(receiveNews(news, 'market')))
);
