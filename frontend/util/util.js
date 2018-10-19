import merge from 'lodash/merge';

export const formatMoney = (amount, showPlus = false) => {
  let sign = showPlus ? '+' : '';
  if (amount < 0) {
    amount *= -1;
    sign = '-';
  }
  return sign + '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const mergeStocks = (a, b) => {
  const mergingLessDetailed = a && a["1W"] && a["1W"].detailed &&
                              b["1W"] && !b["1W"].detailed;
  let oldWeek = null;
  if (mergingLessDetailed) oldWeek = a["1W"];
  const newStock = merge({}, a, b);
  if (mergingLessDetailed) newStock["1W"] = oldWeek;
  return newStock;
};

export const mergeStockHashes = (a, b) => {
  Object.keys(b).forEach(symbol => {
    if (typeof b[symbol] === 'object' && symbol.toUpperCase() !== symbol) {
      b[symbol.toUpperCase()] = b[symbol];
      delete b[symbol];
    }
  });
  Object.keys(b).forEach(symbol => {
    if (typeof b[symbol] === 'object') {
      a[symbol] = mergeStocks(a[symbol], b[symbol]);
    } else {
      a[symbol] = b[symbol];
    }
  });
  return a;
};
