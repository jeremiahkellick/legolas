export const logIn = user => (
  $.ajax({ method: 'POST', url: '/api/session', data: { user } })
);

export const logOut = () => $.ajax({ method: 'DELETE', url: '/api/session' });

export const fetchCharts = () => $.ajax({ url: '/api/charts' });
