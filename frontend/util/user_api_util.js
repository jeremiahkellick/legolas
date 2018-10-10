export const createUser = user => (
  $.ajax({ method: 'POST', url: '/api/users', data: { user } })
);
