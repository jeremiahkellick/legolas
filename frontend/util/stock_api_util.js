export const fetchStock = id => $.ajax({ url: `/api/stocks/${id}` });
