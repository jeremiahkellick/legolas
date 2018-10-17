export const watchStock = symbol => (
  $.ajax({ method: 'POST', url: '/api/watches', data: { symbol } })
);

export const unwatchStock = symbol => (
  $.ajax({ method: 'DELETE', url: `/api/watches/${symbol}` })
);
