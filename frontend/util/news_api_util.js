export const fetchNews = q => (
  $.ajax({ url: `/api/news?q=${encodeURIComponent(q)}` })
);
