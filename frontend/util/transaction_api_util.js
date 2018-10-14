export const createTransaction = transaction => (
  $.ajax({ method: 'POST', url: '/api/transactions', data: { transaction } })
);
