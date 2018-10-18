export const formatMoney = (amount, showPlus = false) => {
  let sign = showPlus ? '+' : '';
  if (amount < 0) {
    amount *= -1;
    sign = '-';
  }
  return sign + '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
