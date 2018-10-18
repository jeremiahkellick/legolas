export const fetchStock = symbol => $.ajax({ url: `/api/stocks/${symbol}` });

export const fetchWeekChart = symbol => (
  $.ajax({ url: `/api/stocks/${symbol}/week` })
);
