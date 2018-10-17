export const fetchDayChart = () => $.ajax({ url: '/api/charts/day' });

export const fetchFiveYearsCharts = () => (
  $.ajax({ url: '/api/charts/five_years' })
);
