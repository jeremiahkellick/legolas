import * as APIUtil from '../util/chart_api_util';

export const RECEIVE_CHARTS = 'RECEIVE_CHARTS';

export const receiveCharts = ({ currentUser, stocks }) => ({
  type: RECEIVE_CHARTS,
  currentUser: currentUser,
  stocks: stocks
});

export const fetchDayChart = () => dispatch => (
  APIUtil.fetchDayChart().then(res => dispatch(receiveCharts(res)))
);

export const fetchFiveYearsCharts = () => dispatch => (
  APIUtil.fetchFiveYearsCharts().then(res => dispatch(receiveCharts(res)))
);

export const fetchWeekChart = () => dispatch => (
  APIUtil.fetchWeekChart().then(res => dispatch(receiveCharts(res)))
);
